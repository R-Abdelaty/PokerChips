package com.poker.pokergame.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.poker.pokergame.service.PokerChips;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.*;
import java.util.Objects;

@RestController
@RequestMapping("/poker")
@CrossOrigin(origins="*")
public class PokerController {                                  //poker is consisted of games that end when every player has 0 money exept 1 winner or when user decides to end the game and each game is consisted of 4 rounds

    private final PokerChips game;

    public PokerController(PokerChips game){
        this.game=game;
    }

    @PostMapping("/start")                                     //start game
    public String startGame() {
        game.startGame();
        return "Game started";
    }

    @PostMapping("/player")                                     //create new player
    public String createPlayer(@RequestBody ArrayList<HashMap<String,Integer>> players){
        try{
            game.createPlayer(players);
            return "player created";
        }
        catch (IllegalArgumentException e){
            return e.getMessage();
        }
    }

    @GetMapping("/state")
    public ResponseEntity<?> state() {
        try {
            return ResponseEntity.ok(game.getState());
        } catch (IllegalStateException e) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "status", "error",
                            "message", e.getMessage()
                    ));
        }
    }

    @GetMapping("/turn")
    public int getTurn() {
        return game.getTurn();
    }

    @PostMapping("/undo")
    public String undo(){
        try{
            game.undo();
            return "undo done successfully";
        } catch (EmptyStackException e) {
            return "no moves to undo";
        }
    }

    /*@PostMapping("restart")
    public void restart(){
        game=null;
    }*/

    @PostMapping("/check")
    public String check(){
        try{
            game.check();
            return game.afterEachAction();
            //return "check done";
        }
        catch (IllegalStateException e){
            return e.getMessage();
        }
    }

    @PostMapping("/raise")
    public String raise(@RequestParam int money){
        try{
            game.checkValidRaise(game.getTurn(),money);
            game.raise(game.getTurn(),money);
            return game.afterEachAction();
            //return "valid raise";
        }
        catch(IllegalArgumentException e){
            return e.getMessage();
        }
    }

    @PostMapping("/call")
    public String call(){
        try{
            game.call(game.getTurn());
            return game.afterEachAction();
            //return "call done";
        }
        catch (IllegalStateException e){
            return e.getMessage();
        }

    }

    @PostMapping("/fold")
    public String fold(){
        game.fold(game.getTurn());
        return game.afterEachAction();
        //return "fold done";
    }

    @PostMapping("/winner")
    public String winner(@RequestBody List<Integer> id){
        try{
            return game.updateWinner(id);
        }
        catch(IllegalArgumentException e){
            return e.getMessage();
        }
    }

    @GetMapping("/system-ended")                                            //checks if the system ended because only 1 player has money
    public boolean getFinish(){
        return game.getFinish();
    }

    @PostMapping("/end-game")                                             //used if user decided to end the game
    public void setFinish(){
        game.setFinish();
    }
}
