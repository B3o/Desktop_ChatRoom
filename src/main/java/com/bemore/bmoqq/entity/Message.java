package com.bemore.bmoqq.entity;

public class Message {
    private String messageId;//每条消息的唯一标识
    private String username; //谁发的
    private String content; //具体发送的内容
    private int type;   //消息的类型 1代表系统上线消息,2代表系统下线消息,3代表更新用户列表消息
    //4代表用户普通消息 5代表抖动消息 6代表撤回消息  ...未完待续...

    public Message(String username, String content, int type) {
        this.username = username;
        this.content = content;
        this.type = type;
    }
    public Message(String username, String content, int type, String messageId) {
        this.username = username;
        this.content = content;
        this.type = type;
        this.messageId = messageId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public void setMessageId(String messageId) {this.messageId = messageId;}
    public String getMessageId(){return messageId;}


}
