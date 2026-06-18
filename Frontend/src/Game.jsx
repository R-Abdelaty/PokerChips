import { use, useState } from 'react'
import { useEffect } from 'react'
import React, { useRef } from "react";
import './game.css'
import "./App.css"
import { getrec, postrec } from "./App.jsx"
function Game({ width, playern}) {
    const [playerN, setN] = useState(playern)

    const [holdingcheck, setcheck] = useState(false)
    const [holdingcall, setcall] = useState(false)
    const [holdingraise, setraise] = useState(false)
    const [holdingfold, setfold] = useState(false)
    const [checkorcall,setcorc] = useState(false)
    const timeoutref = useRef(null);
    
    const [table, setTable] = useState(10)
    const [round,setround] = useState(1)

    // Player 1
    const [player1, setPlayer1] = useState("Player 1");
    const [chips1, setChips1] = useState(5000);
    const [current1, setCurrent1] = useState(false);
    const [folded1, setfolded1] = useState(false);

    // Player 2
    const [player2, setPlayer2] = useState("Player 2");
    const [chips2, setChips2] = useState(5000);
    const [current2, setCurrent2] = useState(false);
    const [folded2, setfolded2] = useState(false);

    // Player 3
    const [player3, setPlayer3] = useState("Player 3");
    const [chips3, setChips3] = useState(5000);
    const [current3, setCurrent3] = useState(false);
    const [playing3, setPlay3] = useState(false)
    const [folded3, setfolded3] = useState(false);

    // Player 4
    const [player4, setPlayer4] = useState("Player 4");
    const [chips4, setChips4] = useState(5000);
    const [current4, setCurrent4] = useState(false);
    const [playing4, setPlay4] = useState(false)
    const [folded4, setfolded4] = useState(false);

    // Player 5
    const [player5, setPlayer5] = useState("Player 5");
    const [chips5, setChips5] = useState(5000);
    const [current5, setCurrent5] = useState(false);
    const [playing5, setPlay5] = useState(false)
    const [folded5, setfolded5] = useState(false);

    // Player 6
    const [player6, setPlayer6] = useState("Player 6");
    const [chips6, setChips6] = useState(5000);
    const [current6, setCurrent6] = useState(false);
    const [playing6, setPlay6] = useState(false)
    const [folded6, setfolded6] = useState(false);


    const playernames = [setPlayer1, setPlayer2, setPlayer3, setPlayer4, setPlayer5, setPlayer6]
    const chips = [setChips1, setChips2, setChips3, setChips4, setChips5, setChips6]
    const currents = [setCurrent1, setCurrent2, setCurrent3, setCurrent4, setCurrent5, setCurrent6]
    const playings = [setPlay3, setPlay4, setPlay5, setPlay6]
    const foldings = [setfolded1, setfolded2, setfolded3, setfolded4,setfolded5,setfolded6]

    
    //Holding buttons functionality
    useEffect(() => {
        if (holdingcheck) {
            timeoutref.current = setTimeout(async() => {
                if (holdingcheck) {
                    await postrec("check","")
                    await state()
                    setcheck(false)
                }
            }, 500)
        }
        else { clearTimeout(timeoutref.current); }
    }, [holdingcheck])
    useEffect(() => {
        if (holdingcall) {
            timeoutref.current = setTimeout(async() => {
                if (holdingcall) {
                    await postrec("call","")
                    await state()
                    setcall(false)
                }
            }, 500)
        }
        else { clearTimeout(timeoutref.current); }
    }, [holdingcall])
    useEffect(() => {
        if (holdingfold) {
            timeoutref.current = setTimeout(async() => {
                if (holdingfold) {
                    await postrec("fold","")
                    await state()
                    setfold(false)
                }
            }, 500)
        }
        else { clearTimeout(timeoutref.current); }
    }, [holdingfold])
    useEffect(() => {
        if (holdingraise) {
            timeoutref.current = setTimeout(async() => {
                if (holdingraise) {
                    await postrec("raise?money=20","")
                    await state()
                    setraise(false)
                }
            }, 500)
        }
        else { clearTimeout(timeoutref.current); }
    }, [holdingraise])

    //-----------------------------------------

    useEffect(()=>{
        for(let i=0; i<(playerN-2);i++){
            playings[i](true)
        }
    })
    const sethimActive = (n) => {
        for (let i = 0; i < 6; i++) {
            currents[i]((i == (n)) ? true : false)
        }
    }

    const tableOrderer = (n) => {
        switch (playerN) {
            case 2:
                switch (n) {
                    case 1: return { gridColumn: 2, gridRow: 1 }
                    case 2: return { gridColumn: 2, gridRow: 4 }
                }
            case 3:
                switch (n) {
                    case 1: return { gridColumn: 2, gridRow: 1 }
                    case 2: return { gridColumn: 3, gridRow: "2/4" }
                    case 3: return { gridColumn: 1, gridRow: "2/4" }
                }
            case 4:
                switch (n) {
                    case 1: return { gridColumn: 2, gridRow: 1 }
                    case 2: return { gridColumn: 3, gridRow: "2/4" }
                    case 3: return { gridColumn: 2, gridRow: 4 }
                    case 4: return { gridColumn: 1, gridRow: "2/4" }
                }
            case 5:
                switch (n) {
                    case 1: return { gridColumn: 2, gridRow: 1 }
                    case 2: return { gridColumn: 3, gridRow: 2 }
                    case 3: return { gridColumn: 3, gridRow: 3 }
                    case 4: return { gridColumn: 1, gridRow: 3 }
                    case 5: return { gridColumn: 1, gridRow: 2 }
                }
            case 6:
                switch (n) {
                    case 1: return { gridColumn: 2, gridRow: 1 }
                    case 2: return { gridColumn: 3, gridRow: 2 }
                    case 3: return { gridColumn: 3, gridRow: 3 }
                    case 4: return { gridColumn: 2, gridRow: 4 }
                    case 5: return { gridColumn: 1, gridRow: 3 }
                    case 6: return { gridColumn: 1, gridRow: 2 }
                }

        }
    }

    const updatePlayer = (n, chip, active,name,fold) => {
        if (active) { sethimActive(n) }
        chips[n](chip)
        playernames[n](name)
        foldings[n](fold)
    };
    const getTurn = async()=>{
        return await getrec("turn")
    }

    const state = async()=>{
        const s = await getrec("state")
      // let s = [{"money" : 100,name : "ahmed","table":20},{"money":200,name:"juna"},{money:200,name:"juna"},{money:200,name:"juna"},{money:200,name:"juna"},{money:200,name:"juna"}]
        const t = await getTurn() //getTurn() wait for what the result looks like
        for(let i=0;i<playerN;i++){
            updatePlayer(i,s[i].money,(t==i) ? true:false,s[i].name,s[i].play)
        }   
        setcorc(s[0].checkOrCall)
        setTable(s[0].table)
        setround(s[0].round)
    }
    useEffect(()=>{state()},[])

    return (
        <>
            <div className="game">
                <div className='rounddiv'><h3>Round : {round}</h3></div>
                <div className="table"></div>
                <div className="playersgrid appear">
                    <div className='center' style={{gridRow: "2/4", gridColumn: 2, height:"100%"}}> <h2 style={{textAlign: "center"}}>Table <br></br> {table}</h2></div>
                    <div className="player" style={tableOrderer(1)}><div className={`banner ${current1 && "active"}`}><h3>{player1}</h3><h3>{chips1}</h3></div></div>
                    <div className="player" style={tableOrderer(2)}><div className={`banner ${current2 && "active"}`}><h3>{player2}</h3><h3>{chips2}</h3></div></div>
                    <div className="player" style={{...tableOrderer(3),...(!playing3 && { display: "none" })}}><div className={`banner ${current3 && "active"}`}><h3>{player3}</h3><h3>{chips3}</h3></div></div>
                    <div className="player" style={{...tableOrderer(4),...(!playing4 && { display: "none" })}}><div className={`banner ${current4 && "active"}`}><h3>{player4}</h3><h3>{chips4}</h3></div></div>
                    <div className="player" style={{...tableOrderer(5),...(!playing5 && { display: "none" })}}><div className={`banner ${current5 && "active"}`}><h3>{player5}</h3><h3>{chips5}</h3></div></div>
                    <div className="player" style={{...tableOrderer(6),...(!playing6 && { display: "none" })}}><div className={`banner ${current6 && "active"}`}><h3>{player6}</h3><h3>{chips6}</h3></div></div>
                </div>
                <div className="bottombuttons appear">
                    {checkorcall ?
                     (<div className='center'><div className={`${holdingcall && "btnhold"}`}><button style={{ zIndex: "999" }} className={`call`} onPointerDown={() => { setcall(true); }} onPointerUp={() => { setcall(false) }} ><h3>call</h3></button></div></div>) 
                     :
                     (<div className='center'><div className={`${holdingcheck && "btnhold"}`}><button style={{ zIndex: "999" }} className={`check`} onPointerDown={() => { setcheck(true); }} onPointerUp={() => { setcheck(false) }} ><h3>check</h3></button></div></div>)}
                    <div className='center'><div className={`${holdingfold && "btnhold"}`}><button style={{ zIndex: "999" }} className={`fold`} onPointerDown={() => { setfold(true); }} onPointerUp={() => { setcheck(false) }} ><h3>fold</h3></button></div></div>
                    <div className='center'><div className={`${holdingraise && "btnhold"}`}><button style={{ zIndex: "999" }} className={`raise`} onPointerDown={() => { setraise(true); }} onPointerUp={() => { setcheck(false) }} ><h3>raise</h3></button></div></div>
                </div>
            </div>
        </>)
}

export default Game
