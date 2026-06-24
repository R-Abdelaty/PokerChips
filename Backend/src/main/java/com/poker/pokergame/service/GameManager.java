package com.poker.pokergame.service;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class GameManager {
    private final ConcurrentHashMap<String,PokerChips> games=new ConcurrentHashMap<>();

    public String createGame(){
        String gameID=UUID.randomUUID().toString();
        PokerChips pokerChips=new PokerChips();
        games.put(gameID,pokerChips);
        pokerChips.startGame();
        return gameID;
    }

    public PokerChips getGame(String gameID){
        if(!games.containsKey(gameID)){
            throw new IllegalArgumentException("game not found");
        }
        return games.get(gameID);
    }

    public void deleteGame(String gameID){
        games.remove(gameID);
    }

}
