package com.poker.pokergame.controller;

import com.poker.pokergame.service.GameManager;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.poker.pokergame.service.PokerChips;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.*;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/poker")
@CrossOrigin(origins="*")
public class PokerController {                                  //poker is consisted of games that end when every player has 0 money exept 1 winner or when user decides to end the game and each game is consisted of 4 rounds

    private final GameManager game;

    public PokerController(GameManager game){
        this.game=game;
    }

    @PostMapping("/start")                                     //start game
    public String startGame() {
        return game.createGame();
    }

    @PostMapping("/{gameID}/player")                                     //create new player
    public String createPlayer(@PathVariable String gameID,@RequestBody ArrayList<HashMap<String,Integer>> players){
        try{
            game.getGame(gameID).createPlayer(players);
            return "player created";
        }
        catch (IllegalArgumentException e){
            return e.getMessage();
        }
    }

    @GetMapping("/{gameID}/state")
    public ResponseEntity<?> state(@PathVariable String gameID) {
        try {
            return ResponseEntity.ok(game.getGame(gameID).getState());
        } catch (IllegalStateException e) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "status", "error",
                            "message", e.getMessage()
                    ));
        }
    }

    @GetMapping("/{gameID}/turn")
    public int getTurn(@PathVariable String gameID) {
        return game.getGame(gameID).getTurn();
    }

    @PostMapping("/{gameID}/undo")
    public String undo(@PathVariable String gameID){
        try{
            game.getGame(gameID).undo();
            return "undo done successfully";
        } catch (EmptyStackException e) {
            return "no moves to undo";
        }
    }

    @PostMapping("/{gameID}/check")
    public String check(@PathVariable String gameID){
        try{
            game.getGame(gameID).check();
            return game.getGame(gameID).afterEachAction();
            //return "check done";
        }
        catch (IllegalStateException e){
            return e.getMessage();
        }
    }

    @PostMapping("/{gameID}/raise")
    public String raise(@PathVariable String gameID,@RequestParam int money){
        try{
            game.getGame(gameID).checkValidRaise(game.getGame(gameID).getTurn(),money);
            game.getGame(gameID).raise(game.getGame(gameID).getTurn(),money);
            return game.getGame(gameID).afterEachAction();
            //return "valid raise";
        }
        catch(IllegalArgumentException e){
            return e.getMessage();
        }
    }

    @PostMapping("/{gameID}/call")
    public String call(@PathVariable String gameID){
        try{
            game.getGame(gameID).call(game.getGame(gameID).getTurn());
            return game.getGame(gameID).afterEachAction();
            //return "call done";
        }
        catch (IllegalStateException e){
            return e.getMessage();
        }

    }

    @PostMapping("/{gameID}/fold")
    public String fold(@PathVariable String gameID){
        game.getGame(gameID).fold(game.getGame(gameID).getTurn());
        return game.getGame(gameID).afterEachAction();
        //return "fold done";
    }

    @PostMapping("/{gameID}/winner")
    public String winner(@PathVariable String gameID,@RequestBody List<Integer> id){
        try{
            return game.getGame(gameID).updateWinner(id);
        }
        catch(IllegalArgumentException e){
            return e.getMessage();
        }
    }

    @GetMapping("/{gameID}/system-ended")                                            //checks if the system ended because only 1 player has money
    public boolean getFinish(@PathVariable String gameID){
        return game.getGame(gameID).getFinish();
    }

    @PostMapping("/{gameID}/end-game")                                             //used if user decided to end the game
    public void setFinish(@PathVariable String gameID){
        game.getGame(gameID).setFinish();
        game.deleteGame(gameID);
    }

}
