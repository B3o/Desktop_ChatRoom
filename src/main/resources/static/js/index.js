var username = $("#username").val();
//window.location.host代表获取ip：port
var url = "ws://" + window.location.host + "/chat?username=" + username;
//与后台建立websocket长连接
// alert(url);
var  ws = new WebSocket(url);
ws.onopen = function () {
    // alert("连接成功");
    //当后台发送数据给前台 就会执行
};
ws.onmessage = function (e) {
    // alert(e.data);
};
ws.onmessage = function (e) {
    var message = JSON.parse(e.data);
    // alert(message.username);
    // alert(message.type);
    // alert(message.content);
    if (!message.type){
        onlineUser(message);
    }else if (message.type == 1) {
        //系统上线消息
        systemOnlineMessage(message);
    }else if(message.type == 4){
        //用户文本消息
        userTextMessage(message);
    }else if(message.type == 5){
        //    收到用户抖动消息
        dydMessage(message);
    }else if(message.type == 6){
        //用户撤销消息
        backupMessage(message);
    }
    /*滚动条滑到最底部*/
    $("#record").scrollTop(9999999);
};

function systemOnlineMessage(message){
    var str = new Array();
    str.push("<div class='system_online'>");
    // str.push("------");
    str.push(message.username + ":" + message.content);
    // str.push("------");
    str.push("</div>");
    $("#record").append(str.join(""));
    if (!message.type){
        onlineUser(message);
    }

}
function onlineUser(usernames) {
    $("#online_people").empty();
    var str = new Array();
    for (var i = 0;i<usernames.length;i++){
        str.push("<li>");
        str.push("<span>");
        str.push("<img src='/face?username="+ usernames[i]+"'>");
        str.push("</span>");
        str.push("<span>");
        str.push(usernames[i]);
        str.push("</span>");
        str.push("</li>");
    }
    $("#online_people").append(str.join(""));
}
function dydMessage(message){
    var str = new Array();
    str.push("<div class='dyd'>");
    str.push(message.username + ":" + message.content);
    str.push("</div>");
    $("#record").append(str.join(""));
//    执行动画，让窗口hi起来
    //    获取窗口当前位置
    var left = $("#win").offset().left;
    var top = $("#win").offset().top;

    for(var i = 0;i < 10;i++){
        var leftnumber = parseInt(Math.random() * 10) + 1;//    随机一个1到10的整数
        var topNumber = parseInt(Math.random() * 10) + 1;
        var flag = parseInt(Math.random() * 10) + 1;
        if(flag % 2 == 0){
            $("#win").animate({"left":left + leftnumber + "px"},10);
            $("#win").animate({"top":top + topNumber + "px"},10);
        }else{
            $("#win").animate({"left":left - leftnumber + "px"},10);
            $("#win").animate({"top":top - topNumber + "px"},10);
        }
    }
    $("#win").animate({"left":left + "px"},10);
    $("#win").animate({"top":top + "px"},10);
};

$("#sendBtn").click(function () {
    var value = $("#textInput").html();
//    因为这个是
    ws.send(value);
    $("#textInput").empty();//清空
    $("#textInput").focus();//聚焦
});
function userTextMessage(message) {
    if (message.username == username){
        var str = new Array();
        str.push("<div>");
        str.push("<img src='/face?username=" + message.username + "'" + "class='chatFace chatFace_me'>");
        str.push("<div class='fr'>");
        str.push("<span class='fr'>" + message.username + "</span>");
        str.push("<span messageId='"+ message.messageId +"' class='text fr clear'>" + message.content + "</span>");
        str.push("</div>");
        str.push("<div style='clear:both;'></div>");
        str.push("</div>");
        $("#record").append(str.join(""));
    }else {
    var str = new Array();
    str.push("<div>");
    str.push("<img src='/face?username=" + message.username + "'" + "class='chatFace'>");
    str.push("<div class='float_left'>");
    str.push("<span>" + message.username + "</span>");
    str.push("<span messageId='"+ message.messageId +"' class='text'>" + message.content + "</span>");
    str.push("</div>");
    str.push("<div style='clear:both;'></div>");
    str.push("</div>");
    $("#record").append(str.join(""));
    }
};
function backupMessage(message){
    var thisMessage  = $("#record .text")
        .filter("[messageId='"+ message.messageId +"']");
    thisMessage.parent().parent()
        .replaceWith("<div class='backup'>" + message.content + "</div>");

};
/*表情包*/
$("#textInput").emoji({
    button:"#emojiBtn",
    showTab: true,
    animation: "fade",
    icons: [{
        name: "QQ表情",
        path: "/emoji/dist/img/qq/",
        maxNum: 92,
        file: ".gif"
    },{
        name: "贴吧表情",
        path: "/emoji/dist/img/tieba/",
        maxNum: 50,
        file: ".jpg"
    }]
});
//抖一抖功能
$("#dyd").click(function () {
    //如果有这个值
    var val = $("#dydValue").val();
    if(val){
        ws.send("\0");
        $("#dydValue").val("");//清空数据
        setTimeout(function () {//设置一个定时器，过10s后执行function函数
            $("#dydValue").val("1");
        },7000);
    }else{
        $("#warning").show();
        $("#warning").fadeOut(2000);
    }
});
//发送图片功能
$("#imgBtn").click(function () {
    $("#file").click();
});
//选择完图片会出发change事件
$("#file").change(function () {
    var files = this.files;//取到用户选择的所有文件
    for (var i = 0; i < files.length; i++){//遍历这些文件
        var reader = new FileReader();
        reader.readAsDataURL(files[i]);//读取当前这一张图片
        reader.onload = function (e) {//读完了会走这个function函数
            var img = document.createElement("img");//创建一个img标签
            img.src = e.target.result;//把读出来的结果放到img中
            img.className = "imgData";//这里给一个样式 方便限制图片
            $("#textInput").append(img);//把img加到输入框里面去
        }
    }
});

// $(document).keypress(function(e) {
//     var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
//     if (eCode == 13){
//         $("#sendBtn").click();
//     }
// });
document.onkeydown=function(e){
    if(e.keyCode == 13 && e.ctrlKey){
        // 这里实现换行
        // var nowText = $("#textInput").html();
        // $("#textInput").html(nowText + "\n");
        document.getElementById("textInput").innerHTML += "<br>";
        $("#textInput").focus();
        // alert(document.getElementById(textInput).innerHTML);
        // alert($("#textInput").html());
    }else if(e.keyCode == 13){
        // 避免回车键换行
        e.preventDefault();
        $("#sendBtn").click();
    }
}

//取消默认的右键菜单
// var win = document.getElementById("win");
document.oncontextmenu = function () {
    return false;
}
$("#record").on("mousedown",".text",function (e) {
    var messageUsername = $(this).prev().html();
   if (e.which == 3 && username == messageUsername){//3号代表右键单击事件
       var messageId = $(this).attr("messageId");
       // alert(messageId);
       $("#messageId").val(messageId);
       $("#backup").css({"left":e.pageX,"top":e.pageY}).show();
   }
});
$("#backup").click(function () {
    $("#backup").hide();
    var messageId = $("#messageId").val();
    ws.send("\1" + messageId);
});
$(document).click(function (e) {
    if(e.target.id != "backup"){
        $("#backup").hide();
    }
});
