/*package com.poker.pokergame.service;

import java.io.PrintWriter;
import java.io.*;
import java.util.*;

public class TestGame {
    final static PrintWriter pw = new PrintWriter(System.out);
    final static Scanner sc = new Scanner(System.in);
    public static void main(String[] args) throws IOException {
        PokerChips game=new PokerChips();
        pw.println("enter number of players");
        pw.flush();
        int n=sc.nextInt();
        /*game.startGame(n);
        for(int i=0;i<n;i++){
            pw.println("enter name and money");
            pw.flush();
            String name=sc.next();
            int money= sc.nextInt();
            game.createPlayer(name,money,game.getID());
            game.updateID();
        }
        while(!game.getFinish()){
            ArrayList<HashMap<String,Object>> state=game.getState();
            if((boolean)state.get(game.getTurn()).get("use Winner")){
                List<Integer>ids=new ArrayList<>();
                pw.println("enter winner id");
                pw.flush();
                int id= sc.nextInt();
                ids.add(id);
                game.updateWinner(ids);
                game.afterEachGame();
                pw.println(game.displayWinners(ids));
                pw.flush();
            }
            else{
                for(int i=0;i<n;i++){
                    pw.print(state.get(i).get("name")+" ");
                    pw.flush();
                    pw.print(state.get(i).get("money")+" ");
                    pw.flush();
                    //pw.print(state.get(i).get("play")+" ");
                    //pw.flush();
                }
                if((boolean)state.get(game.getTurn()).get("play")){
                    pw.println("round "+state.get(game.getTurn()).get("round"));
                    pw.flush();
                    pw.println("table="+state.get(game.getTurn()).get("table"));
                    pw.flush();
                    pw.println(state.get(game.getTurn()).get("name")+"'s turn");
                    pw.flush();
                    if((boolean)state.get(game.getTurn()).get("check Or Call")){
                        pw.println("choose action: call=1,raise=2,fold=3,4=undo");
                        pw.flush();
                    }
                    else{
                        pw.println("choose action: check=0,raise=2,fold=3,4=undo");
                        pw.flush();
                    }
                    Stack<ArrayList<Integer>>temp=game.getStack();                           //test
                    while(!temp.isEmpty()){
                        ArrayList<Integer>x=temp.pop();
                        for(int j:x){
                            pw.print(j+" ");
                            pw.flush();
                        }
                        pw.println();
                        pw.flush();
                    }
                    int action=sc.nextInt();
                    if(action==0){
                        game.check();
                        game.afterEachAction();
                    }
                    else if(action==1){
                        game.call(game.getTurn());
                        game.afterEachAction();
                    }
                    else if(action==2){
                        pw.println("enter raise");
                        pw.flush();
                        int money=sc.nextInt();
                            game.checkValidRaise(game.getTurn(),money);
                            game.raise(game.getTurn(),money);
                            game.afterEachAction();
                    }
                    else if(action==3){
                        game.fold(game.getTurn());
                        game.afterEachAction();
                    }
                    else{
                        game.undo();
                    }
                }
                else{
                    pw.println("balabizo");
                    pw.flush();
                }
            }
        }
    }
    static class Scanner {

        StringTokenizer st;
        BufferedReader br;
        public Scanner(InputStream s) {
            br = new BufferedReader(new InputStreamReader(s));
        }
        public Scanner(String file) throws IOException {
            br = new BufferedReader(new FileReader(file));
        }
        public Scanner(FileReader r) {
            br = new BufferedReader(r);
        }
        public String next() throws IOException {
            while (st == null || !st.hasMoreTokens())
                st = new StringTokenizer(br.readLine());
            return st.nextToken();
        }
        public String readAllLines(BufferedReader reader) throws IOException {
            StringBuilder content = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line);
                content.append(System.lineSeparator());
            }
            return content.toString();
        }
        public int nextInt() throws IOException {
            return Integer.parseInt(next());
        }
        public long nextLong() throws IOException {
            return Long.parseLong(next());
        }
        public String nextLine() throws IOException {
            return br.readLine();
        }
        public double nextDouble() throws IOException {
            String x = next();
            StringBuilder sb = new StringBuilder("0");
            double res = 0, f = 1;
            boolean dec = false, neg = false;
            int start = 0;
            if (x.charAt(0) == '-') {
                neg = true;
                start++;
            }
            for (int i = start; i < x.length(); i++)
                if (x.charAt(i) == '.') {
                    res = Long.parseLong(sb.toString());
                    sb = new StringBuilder("0");
                    dec = true;
                } else {
                    sb.append(x.charAt(i));
                    if (dec)
                        f *= 10;
                }
            res += Long.parseLong(sb.toString()) / f;
            return res * (neg ? -1 : 1);
        }
        public long[] nextlongArray(int n) throws IOException {
            long[] a = new long[n];
            for (int i = 0; i < n; i++)
                a[i] = nextLong();
            return a;
        }
        public Long[] nextLongArray(int n) throws IOException {
            Long[] a = new Long[n];
            for (int i = 0; i < n; i++)
                a[i] = nextLong();
            return a;
        }
        public int[] nextIntArray(int n) throws IOException {
            int[] a = new int[n];
            for (int i = 0; i < n; i++)
                a[i] = nextInt();
            return a;
        }
        public Integer[] nextIntegerArray(int n) throws IOException {
            Integer[] a = new Integer[n];
            for (int i = 0; i < n; i++)
                a[i] = nextInt();
            return a;
        }
        public boolean ready() throws IOException {
            return br.ready();
        }

    }
}*/
