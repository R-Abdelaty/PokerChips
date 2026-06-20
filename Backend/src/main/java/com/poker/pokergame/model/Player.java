package com.poker.pokergame.model;


public class Player{

    private String name;
    private int money;
    private boolean play;

    public Player(String name,int money){
        this.name=name;
        this.money=money;
        play=true;
    }
    public String getName(){
        return name;
    }
    public int getMoney(){
        return money;
    }
    public void setMoney(int update){
        money=update;
    }
    public void doNotPlay(){
        play=false;
    }
    public void Play(){
        play=true;
    }
    public boolean getPlay(){
        return play;
    }

}
