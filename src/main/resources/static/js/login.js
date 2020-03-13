//拖动多选
// (function(){
// 	$(document).on("mousedown",function(e){
// 		var dskIcons = $(".dsk_icon");
// 		var mask = $(".mask");
// 		var startX = e.pageX;
// 		var startY = e.pageY;
// 		mask.css({left:startX,top:startY}).show();
// 		$(document).on("mousemove.select",function(e){
// 			var disX = e.pageX - startX;
// 			var disY = e.pageY - startY;
// 			//console.log(startX,disX);
// 			if( disX>=0 && disY>0 ){
// 				mask.css({width:disX,height:disY,left:startX,top:startY});
// 			}else if( disX>0 && disY<=0 ){
// 				mask.css({width:disX,height:-disY,left:startX,top:e.pageY})
// 			}else if( disX<=0 && disY<0 ){
// 				mask.css({width:-disX,height:-disY,top:e.pageY,left:e.pageX})
// 			}else /*if( disX<0 && disY>=0 )*/{
// 				mask.css({width:-disX,height:disY,left:e.pageX,top:startY})
// 			}
// 			var maskW = mask.width();
// 			var maskH = mask.height();
// 			var maskL = mask.position().left;
// 			var maskT = mask.position().top;

// 		});

// 		$(document).on("mouseup.select",function(e){
// 			$(document).off(".select");
// 			mask.css({width:0,height:0}).hide();
// 		});
// 	})


// })();
setInterval(function(){
    getNowTime();
},1000);
getNowTime();
function getNowTime(){
    var time = new Date();
    var day = time.getFullYear() +"/"+ (time.getMonth()+1) +"/"+ time.getDate();
    var mm = time.getMinutes();
    var ss = time.getSeconds();
    if(mm<10){
        mm = "0"+mm;
    }
    if(ss<10){
        ss = "0"+ss;
    }
    var nowTime = time.getHours() +":"+ mm /*+":"+ ss*/;
    $(".time").html("<span>"+ nowTime +"</span><span>"+ day +"</span>");
}

$("body").css("height",$(window).height());

//开始菜单
$(".start").mousedown(function(){
    $(".menu").toggle(10);
    return false;
});

//点击空余地方的时候
$(document).mousedown(function(){
    //隐藏开始菜单
    $(".menu").hide(0);
});

//桌面LOGO单击触发事件
// $("#desktop li").click(function () {
//     $("#desktop li").removeClass("choose");
//     $(this).addClass("choose");
// });

// $("html").click(function(e){
//     if(e.target.tagName == "HTML"){
//         $("#desktop li").removeClass("choose");
//     }
// });

$("#box>span").click(function () {
    $(this).toggleClass("checked");
})

var win = document.getElementById("tencent");
win.ondragstart = function(e){
    x = e.offsetX;
    y = e.offsetY;
}
win.ondrag = function (e) {
    if($("#username").is("focus")){
        $("#tencent").attr("draggable",false);
        return;
    }
    if(e.pageX == 0 && e.pageY == 0) return;
    win.style.left = e.pageX - x + "px";
    win.style.top = e.pageY - y + "px";
}
//输入改变时就执行函数
$("#username").on("input propertychange",function () {
    var url = "/face?username=" + this.value;
    $("#face").attr("src",url);
});
$("#face").on("error",function () {
    $(this).attr("src","/images/default_face.png")
});
$("#small").click(function () {
    //给QQ登录窗口添加最小动画
    $("#tencent").addClass("small");
    //显示任务栏QQ小图标
    $("#qq_task").show()
});
//双击id为qq的桌面图标，显示Tencent主界面
$("#qq").click(function () {
    $("#tencent").fadeIn(300);
});

//点击任务栏小图标QQ，删除最小化的动画
$("#qq_task").click(function () {
    $("#tencent").removeClass("small");
    $(this).hide();
});
//如果有dialog提示框。就要默认显示主窗口
var dialog = document.getElementById("dialog");
var tencent = document.getElementById("tencent");
if(dialog){
    var url = "/face?username=" + $("#username").val();
    $("#face").attr("src",url);
    $("#tencent").show();
}
//右键菜单
$(document).on("contextmenu",function(e){
    var L = e.pageX;
    var T = e.pageY;
    var menu = $(".context_menu");
    var menuW = menu.width();
    var menuH = menu.height();
    var menuL = menu.position().left;
    var menuT = menu.position().right;
    if(L>$(window).width()-menuW){
        L = L - menuW;
    }
    if(T>$(window).height()-menuH){
        if(T<menuH){
            T = $(window).height()-menuH;
        }else{
            T = T - menuH;
        }
    }
    menu.css({left:L, top:T}).show();
    return false;
});
$(document).click(function () {
    $(".context_menu").hide();
});
$("#cls").click(function () {
    $("#tencent").fadeOut(300);
})