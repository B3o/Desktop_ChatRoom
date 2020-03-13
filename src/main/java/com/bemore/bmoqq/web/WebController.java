package com.bemore.bmoqq.web;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {
    @RequestMapping("/register.html")
    public String register(){
        return "/register";
    }
    @RequestMapping("/login.html")
    public String login(){
        return "/login";
    }
    @RequestMapping("/index.html")
    public String index(){return "/index";}

}
