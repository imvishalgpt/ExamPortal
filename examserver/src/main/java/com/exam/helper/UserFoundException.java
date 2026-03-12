package com.exam.helper;

public class UserFoundException extends RuntimeException{

    public UserFoundException(){
        super("User with this Username is already there in DB!! try with another username");
    }
    public UserFoundException(String msg){super(msg);}
}
