package com.bemore.bmoqq.entity;

import java.io.Serializable;

//
//javabean
//封装：属性私有化
//提供共有的getter setter方法
public class User implements Serializable {
    //    这里的getter和setter方法需要一键生成
//    不然自己敲的话前端框架调用的话会出现问题${username},会自动调用getUsername
    private String username;
    private String password;
    private byte[] faceByte;
    //code Generate GetterAndSetter
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public byte[] getFaceByte() {
        return faceByte;
    }

    public void setFaceByte(byte[] faceByte) {
        this.faceByte = faceByte;
    }
}
