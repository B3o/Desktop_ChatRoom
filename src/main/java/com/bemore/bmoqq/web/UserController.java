package com.bemore.bmoqq.web;


import com.bemore.bmoqq.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;

@Controller
public class UserController {
//    转发：服务器内部跳转页面
//    重定向：二次跳转\
//    重定向可以跳转到外部页面，属于二次跳转，url地址栏会改变
//    转发属于服务器内部跳转，属于一次请求，url地址栏不会改变，性能比重定向高

    //    jsp
//    pageContext request session  application
    @Autowired
    private RedisTemplate<String,Object> redisTemplate;
    @RequestMapping("/doRegister")
    public ModelAndView doRegister(User user, MultipartFile face) throws Exception{
        ModelAndView mv;
        if (redisTemplate.hasKey(user.getUsername())) {
            mv = new ModelAndView("register");
            mv.addObject("msg","要注册的账户已存在，请更换");
            return mv;
        }else if(user.getUsername().contains("<") || user.getUsername().contains(">")
                || user.getUsername().contains("/")|| user.getUsername().contains("\\")
                || user.getUsername().contains("\"")|| user.getUsername().contains("$")){
            mv = new ModelAndView("register");
            mv.addObject("msg","含有非法字符，请重新注册");
            return mv;
        }else if(user.getUsername().length() > 20) {
            mv = new ModelAndView("register");
            mv.addObject("msg","用户名输入过长，请重新注册");
            return mv;
        }
        user.setFaceByte(face.getBytes());
        redisTemplate.opsForValue().set(user.getUsername(),user);
        mv = new ModelAndView("redirect:/login.html");
        return mv;
    }
    @RequestMapping("/face")
    @ResponseBody //不跳转页面 直接返回数据
    public byte[] queryFace(String username){
        if(redisTemplate.hasKey(username)){
            User user = (User)redisTemplate.opsForValue().get(username);
            return user.getFaceByte();
        }
        return null;
    }

@RequestMapping("/doLogin")
public ModelAndView doLogin(User user, HttpSession session){
    ModelAndView mv = new ModelAndView("");
//        如果这个账号存在
    if(redisTemplate.hasKey(user.getUsername())){
//            取出数据库中的这个user
        User redisUser = (User)redisTemplate.opsForValue().get(user.getUsername());
//            拿数据库中的user和传进来的user密码作比较
        if (redisUser.getPassword().equals(user.getPassword())){
            mv.setViewName("redirect:/index.html");
            session.setAttribute("user",redisUser);
//                把用户的登录信息保存到会话中，用户不关闭浏览器
            return mv;
        }
    }
    mv.setViewName("login");
//        把值再带回去
    mv.addObject("user",user.getUsername());
    mv.addObject("msg","用户名或密码错误！");
    return mv;
}

}
