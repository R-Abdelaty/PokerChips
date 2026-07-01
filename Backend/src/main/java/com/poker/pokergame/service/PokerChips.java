package com.poker.pokergame.service;

import com.poker.pokergame.model.Player;

import java.util.*;


public class PokerChips {

    private int numOfPlayers;
    private HashMap<Integer, Player> players;
    private int table,round, call, bider, raise,turn,starter,cnt,foldedPlayers,tempFoldedPlayers;
    private boolean end, isRaise, finish,useWinner;
    private int[] called;
    private Stack<ArrayList<Integer>> stack;
    HashMap<Integer,Stack<Integer>>prevCalled;
    public void startGame(){
        table=0;
        turn=0;
        starter=0;
        cnt=0;
        foldedPlayers=0;
        tempFoldedPlayers=0;
        round=1;
        end=false;
        finish=false;
        useWinner=false;
        prevCalled=new HashMap<>();
        players=new HashMap<>();
        stack =new Stack<>();
    }

    public void checkNumOfPlayers(int n){
        if (n < 2 || n > 6) {
            throw new IllegalArgumentException("number of players must be between 2 and 6");
        }
        numOfPlayers=n;
        called=new int[numOfPlayers];
        for(int i=0;i<numOfPlayers;i++){
            prevCalled.put(i,new Stack<>());
        }
    }

    public void createPlayer(ArrayList<HashMap<String,Integer>>player){
        checkNumOfPlayers(player.size());
        for(int i=0;i<player.size();i++){
            if(player.get(i).isEmpty()){
                throw new IllegalArgumentException("must enter a player");
            }
            Map.Entry<String, Integer> entry = player.get(i).entrySet().iterator().next();
            String name= entry.getKey();
            int money= entry.getValue();
            /*if(id>=numOfPlayers){
                throw new IllegalArgumentException("you already created the max number of players");
            }*/
            if(money<=0){
                throw new IllegalArgumentException("money must be greater than 0");
            }
            players.put(i,new Player(name,money));
        }
    }

    public ArrayList<HashMap<String,Object>> getState(){
        if(players==null||players.isEmpty()){
            throw new IllegalStateException("players have not been initialized");
        }
        ArrayList<HashMap<String,Object>>player=new ArrayList<>();
        for(int i=0;i<numOfPlayers;i++){
            HashMap<String,Object>state=new HashMap<>();
            state.put("table",table);
            state.put("name",getPlayer(i).getName());
            state.put("money",getPlayer(i).getMoney());
            state.put("play",getPlayer(i).getPlay());
            state.put("round",round);
            state.put("useWinner",useWinner);
            state.put("checkOrCall",isRaise);   //true=call
            state.put("currentRaise",raise);
            player.add(state);
        }
        return player;
    }

    private void updateRound(){
        if(round==4){
            end=true;
            round=1;
        }
        else round++;
    }

    public String afterEachAction(){
        if(raiseEnded(getTurn())){
            afterEachRound();
        }
        else if(cnt==numOfPlayers-foldedPlayers&&!isRaise){
            afterEachRound();
        }
        int temp=checkOnlyWinner();
        if(temp!=-1){
            useWinner=true;
            List<Integer>winner=new ArrayList<>();
            winner.add(temp);
            return updateWinner(winner);
        }
        return "no winner yet";
    }

    public void afterEachGame(){
        gameEnded();
        setDefault1();
        updateStarter();
        updateEnd();
        useWinner=false;
        stack.clear();
        for(int i=0;i<numOfPlayers;i++){
            prevCalled.get(i).clear();
        }
    }

    public void afterEachRound(){
        if(checkGameEnded()||round==4){
            useWinner=true;
        }
        else{
            setDefault2();
            updateTurnAfterRaise();
            updateRound();
        }
    }

    public boolean checkGameEnded(){
        if(checkRoundsFinished()) return true;
        if(getEnd()) return true;
        return false;
    }

    private void updateStarter(){
        if(starter==numOfPlayers-1) starter=0;
        else starter++;
        turn=starter;
    }

    public int getTurn(){
        return turn;
    }

    private void updateTurn(){
        if(turn==numOfPlayers-1) turn=0;
        else turn++;
        int i=0;
        while(!getPlayer(getTurn()).getPlay()||getPlayer(getTurn()).getMoney()==0&&i<numOfPlayers){
            if(turn==numOfPlayers-1) turn=0;
            else turn++;
            i++;
        }
    }

    public Player getPlayer(int j){
        return players.get(j);
    }

    public void setFinish() {
        finish = true;
    }

    public boolean getFinish() {
        return finish;
    }

    private void setDefault1() {
        table = 0;
        foldedPlayers=0;
        end = false;
        for(int i=0;i<numOfPlayers;i++){
            if(players.get(i).getMoney()!=0) players.get(i).Play();
            else foldedPlayers++;
        }
    }

    private void setDefault2() {
        call = cnt  = raise = 0;
        bider=-1;
        foldedPlayers+=tempFoldedPlayers;
        tempFoldedPlayers=0;
        isRaise = false;
        for (int i = 0; i < numOfPlayers; i++) {
            called[i] = 0;
        }
    }

    public void gameEnded(){
        int cnt=0;
        for (int i = 0; i < numOfPlayers; i++) {
            int get = players.get(i).getMoney();
            if (get == 0 || !players.get(i).getPlay()) cnt++;
        }
        if (cnt >= numOfPlayers - 1) {
            finish=true;
        }
        else{
            finish=false;
        }
    }

    private boolean checkRoundsFinished() {
        int cnt=0;
        for (int i = 0; i < numOfPlayers; i++) {
            int get = players.get(i).getMoney();
            if (get == 0 || !players.get(i).getPlay()) cnt++;
        }
        if (cnt >= numOfPlayers - 1) {
            return true;
        }
        return false;
    }

    public String updateWinner(List<Integer>winner) {
        if(!useWinner){
            throw new IllegalStateException("can't use method, no winner yet");
        }
        int cnt=0;
        for (int i = 0; i < numOfPlayers; i++) {
            //int get = players.get(i).getMoney();
            if (!players.get(i).getPlay()) cnt++;
        }
        if(winner==null||winner.size()>numOfPlayers-cnt||winner.isEmpty()){
            throw new IllegalArgumentException("invalid number of winners");
        }
        for(int i:winner){
            if(!players.containsKey(i)||!players.get(i).getPlay()){
                throw new IllegalArgumentException("invalid id");
            }
        }
        stack.clear();
        int money=table/winner.size();
        for(int id:winner){
            int update = players.get(id).getMoney();
            update += money;
            players.get(id).setMoney(update);
        }
        afterEachGame();
        return displayWinners(winner);
    }

    public String displayWinners(List<Integer>winners){
        StringBuilder display=new StringBuilder();
        for(int id:winners){
            display.append(players.get(id).getName()+" won\n");
        }
        String ans=display.toString();
        return ans;
    }

    private boolean raiseEnded(int j) {
        if (j == bider && isRaise) {
            return true;
        }
        return false;
    }

    private void updateTurnAfterRaise() {
        isRaise = false;
        turn=starter;
        int i=0;
        while(!getPlayer(getTurn()).getPlay()||getPlayer(getTurn()).getMoney()==0&&i<numOfPlayers){
            if(turn==numOfPlayers-1) turn=0;
            else turn++;
            i++;
        }
    }

    /*public Stack<ArrayList<Integer>> getStack(){                                                       //test
        return (Stack<ArrayList<Integer>>) stack.clone();
    }*/

    public void addStack(int action){
        ArrayList<Integer>temp=new ArrayList<>();//0)round 1)action(0=check,1=fold,2=raise,3=call) 2)id 3)raise 4)bider 5)isRaise(0=false,1=true) 6)cnt 7)tempFoldedPlayers 8)foldedPlayers
        temp.add(round);
        temp.add(action);
        temp.add(turn);
        temp.add(raise);
        temp.add(bider);
        temp.add(isRaise?1:0);
        temp.add(cnt);
        temp.add(tempFoldedPlayers);
        temp.add(foldedPlayers);
        stack.add(temp);
    }

    public void undo(){
        if(stack.isEmpty()){
            throw new EmptyStackException();
        }
        ArrayList<Integer>temp=stack.pop();
        turn=temp.get(2);
        round=temp.get(0);
        if(temp.get(1)==1){
            players.get(turn).Play();
        }
        else if(temp.get(1)==2){
            int update=players.get(turn).getMoney();
            int prev=prevCalled.get(turn).isEmpty()?0:prevCalled.get(turn).pop();
            update+=temp.get(3);
            update-=prev;
            players.get(turn).setMoney(update);
            table-= temp.get(3);
            table+=prev;
            called[turn]=prev;
            if(!stack.isEmpty()){
                raise=stack.peek().get(3);
                bider=stack.peek().get(4);
                isRaise=stack.peek().get(5)==0?false:true;
            }
            else{
                raise=0;
                bider=-1;
                isRaise=false;
            }
        }
        else if(temp.get(1)==3){
            int update=players.get(turn).getMoney();
            int prev=prevCalled.get(turn).isEmpty()?0:prevCalled.get(turn).pop();
            update+=temp.get(3);
            update-=prev;
            players.get(turn).setMoney(update);
            table-= temp.get(3);
            table+=prev;
            called[turn]=prev;
        }
        if(!stack.isEmpty()){
            cnt=stack.peek().get(6);
            tempFoldedPlayers=stack.peek().get(7);
            foldedPlayers=stack.peek().get(8);
        }
        else{
            cnt=0;
            tempFoldedPlayers=0;
            foldedPlayers=0;
        }
    }

    public void check(){
        if(isRaise){
            throw new IllegalStateException("invalid move can't check");
        }
        if(useWinner){
            throw new IllegalStateException("can't make a move, there must be a winner");
        }
        addStack(0);
        updateTurn();
        cnt++;
    }

    public void fold(int j) {
        if(useWinner){
            throw new IllegalStateException("can't make a move, there must be a winner");
        }
        addStack(1);
        players.get(j).doNotPlay();
        updateTurn();
        tempFoldedPlayers++;
        cnt++;
    }

    public void raise(int j, int x) {
        if(useWinner){
            throw new IllegalStateException("can't make a move, there must be a winner");
        }
        int update;
        raise = x;
        update = players.get(j).getMoney();
        update -= raise;
        update += called[j];
        table += raise;
        table -= called[j];
        players.get(j).setMoney(update);
        isRaise = true;
        prevCalled.get(j).add(called[j]);
        called[j] = raise;
        bider = j;
        addStack(2);
        updateTurn();
        cnt++;
    }

    public void call(int j) {
        if(!isRaise){
            throw new IllegalStateException("invalid move can't call");
        }
        if(useWinner){
            throw new IllegalStateException("can't make a move, there must be a winner");
        }
        int update = players.get(j).getMoney();
        call = raise - called[j];
        prevCalled.get(j).add(called[j]);
        if (update - call < 0) {
            table += update;
            called[j]+=update;
            update = 0;
        } else {
            update -= call;
            table += call;
            called[j] = raise;
        }
        players.get(j).setMoney(update);
        addStack(3);
        updateTurn();
        cnt++;
    }

    private int checkOnlyWinner() {
        int cnt = 0;
        int index = 0;
        for (int k = 0; k < numOfPlayers; k++) {
            if (players.get(k).getPlay()) {
                cnt++;
                index = k;
            }
        }
        if (cnt == 1) {
            end = true;
            return index;
        }
        return -1;
    }

    public void checkValidRaise(int j, int money) {
        int get = players.get(j).getMoney();
        get -= money;
        get += called[j];
        if (get < 0 || money <= raise) {
            throw new IllegalArgumentException("Enter valid raise min: "+ raise + " max: "+ players.get(j).getMoney());
        }
    }

    private boolean getEnd() {
        return end;
    }

    private void updateEnd(){
        if(end) end=false;
        round=1;
    }

}