import { use, useState } from 'react'
import { useEffect } from 'react'
import React, { useRef } from "react";
import './game.css'
import "./App.css"
import { getrec, postrec } from "./App.jsx"
function Game({ width, playern }) {
    const [playerN, setN] = useState(playern)

    const [holdingcheck, setcheck] = useState(false)
    const [holdingcall, setcall] = useState(false)
    const [holdingraise, setraise] = useState(false)
    const [holdingfold, setfold] = useState(false)
    const [checkorcall, setcorc] = useState(false)
    const [raising, setr] = useState(false)
    const [raisenum, setrnum] = useState("")
    const [reddish, setreddish] = useState(false)
    const [inv, setinv] = useState(false)
    const timeoutref = useRef(null);
    const [checkWinner, setcheckWinner] = useState(false)
    const [roundwinner, setroundwinner] = useState("")
    const [iswinning, setwin] = useState(false)
    const [quit, setquit] = useState(false)

    const [table, setTable] = useState(10)
    const [round, setround] = useState(1)

    const quitGame = () => {
        window.location.assign(`${window.location.origin}/`)
    }

    // Player 1
    const [player1, setPlayer1] = useState("Player 1");
    const [chips1, setChips1] = useState(5000);
    const [current1, setCurrent1] = useState(false);
    const [folded1, setfolded1] = useState(false);
    const [selected1, setselected1] = useState(false);

    // Player 2
    const [player2, setPlayer2] = useState("Player 2");
    const [chips2, setChips2] = useState(5000);
    const [current2, setCurrent2] = useState(false);
    const [folded2, setfolded2] = useState(false);
    const [selected2, setselected2] = useState(false);
    // Player 3
    const [player3, setPlayer3] = useState("Player 3");
    const [chips3, setChips3] = useState(5000);
    const [current3, setCurrent3] = useState(false);
    const [playing3, setPlay3] = useState(false)
    const [folded3, setfolded3] = useState(false);
    const [selected3, setselected3] = useState(false);

    // Player 4
    const [player4, setPlayer4] = useState("Player 4");
    const [chips4, setChips4] = useState(5000);
    const [current4, setCurrent4] = useState(false);
    const [playing4, setPlay4] = useState(false)
    const [folded4, setfolded4] = useState(false);
    const [selected4, setselected4] = useState(false);
    // Player 5
    const [player5, setPlayer5] = useState("Player 5");
    const [chips5, setChips5] = useState(5000);
    const [current5, setCurrent5] = useState(false);
    const [playing5, setPlay5] = useState(false)
    const [folded5, setfolded5] = useState(false);
    const [selected5, setselected5] = useState(false);
    // Player 6
    const [player6, setPlayer6] = useState("Player 6");
    const [chips6, setChips6] = useState(5000);
    const [current6, setCurrent6] = useState(false);
    const [playing6, setPlay6] = useState(false)
    const [folded6, setfolded6] = useState(false);
    const [selected6, setselected6] = useState(false);

    const playernames = [setPlayer1, setPlayer2, setPlayer3, setPlayer4, setPlayer5, setPlayer6]
    const chips = [setChips1, setChips2, setChips3, setChips4, setChips5, setChips6]
    const currents = [setCurrent1, setCurrent2, setCurrent3, setCurrent4, setCurrent5, setCurrent6]
    const playings = [setPlay3, setPlay4, setPlay5, setPlay6]
    const foldings = [setfolded1, setfolded2, setfolded3, setfolded4, setfolded5, setfolded6]
    const selectarr = [setselected1, setselected2, setselected3, setselected4, setselected5, setselected6]
    const selects = [selected1, selected2, selected3, selected4, selected5, selected6]
    const [throww, seterr] = useState(false)
    const [throwwback, seterrb] = useState(false)
    const neterr = () => {
        seterr(true)
        seterrb(false)
        setTimeout(() => {
            seterr(false)
            seterrb(true)
        }, 3000);
    }
    //Holding buttons functionality
    useEffect(() => {
        if (holdingcheck) {
            timeoutref.current = setTimeout(async () => {
                if (holdingcheck) {
                    let x = await postrec("check", "",neterr)
                    if(x != false){
                        checkwin(x)
                        await state()
                    }
                    
                    setcheck(false)
                }
            }, 500)
        }
        else { clearTimeout(timeoutref.current); }
    }, [holdingcheck])
    useEffect(() => {
        if (holdingcall) {
            timeoutref.current = setTimeout(async () => {
                if (holdingcall) {
                    let x = await postrec("call", "",neterr)
                    if(x != false ){
                        checkwin(x)
                        await state()
                    }
                    setcall(false)
                }
            }, 500)
        }
        else { clearTimeout(timeoutref.current); }
    }, [holdingcall])
    useEffect(() => {
        if (holdingfold) {
            timeoutref.current = setTimeout(async () => {
                if (holdingfold) {
                    let x = await postrec("fold", "",neterr)
                    if(x != false){
                    checkwin(x)
                    await state()
                    }
                    setfold(false)
                }
            }, 500)
        }
        else { clearTimeout(timeoutref.current); }
    }, [holdingfold])
    useEffect(() => {
        if (holdingraise) {
            timeoutref.current = setTimeout(async () => {
                if (holdingraise) {
                    setr(true)
                }
            }, 500)
        }
        else { clearTimeout(timeoutref.current); }
    }, [holdingraise])

    const raisebtn = async () => {
        const isNumber = raisenum.trim() !== "" && !Number.isNaN(Number(raisenum));

        if (isNumber) {
            let r = await postrec(`raise?money=${raisenum}`, "",neterr)
            if(r != false){

                r = r.substring(0, 5)
                if (r == "Enter") {
                    setreddish(true)
                }
                else {
                setr(false)
                await state()
                setraise(false)
                setreddish(false)
            }
        }
        }
        else {
            setreddish(true)
        }


    }

    //-----------------------------------------

    useEffect(() => {
        for (let i = 0; i < (playerN - 2); i++) {
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
    const select = (n) => {
        selectarr[n - 1](selects[n - 1] ? false : true)
    }
    const undo = async () => {
        if(await postrec("undo", "",neterr) != false){
            await state()
        }
    }
    const updatePlayer = (n, chip, active, name, fold) => {
        if (active) { sethimActive(n) }
        chips[n](chip)
        playernames[n](name)
        foldings[n](fold)
    };
    const getTurn = async () => {
        return await getrec("turn")
    }
    const win = async () => {
        let winners = []
        let valid = false
        for (let j = 0; j < 6; j++) {
            if (selects[j] == true) {
                valid = true
            }
        }
        if (valid) {

            for (let j = 0; j < 6; j++) {
                if (selects[j] == true) {
                    winners.push(j)
                }
            }
            console.log(winners)

            if(await postrec("winner", winners,neterr) != false){

                for (let k = 0; k < 6; k++) {
                    selectarr[k](false)
                }
                setreddish(false)
                await state()
            }

        }
        else {
            setreddish(true)
        }

    }
    const checkwin = (t) => {
        let temp = t.substring(0, 2)
        if (temp == "no") { return }
        else {
            let num = 0
            for (let nn = 0; nn < t.length; nn++) {
                if (t[nn] == " ") { break }
                num++
            }
            setroundwinner(t.substring(0, num))
            setwin(true)
            setTimeout(() => {
                setwin(false)
                setroundwinner("")
            }, 2000);
        }

    }
    const state = async () => {
        const s = await getrec("state",neterr)
        // let s = [{"money" : 100,name : "ahmed","table":20},{"money":200,name:"juna"},{money:200,name:"juna"},{money:200,name:"juna"},{money:200,name:"juna"},{money:200,name:"juna"}]
       if(s != false){
           const t = await getTurn() //getTurn() wait for what the result looks like
           setN(s.length)
           for (let i = 0; i < s.length; i++) {
               updatePlayer(i, s[i].money, (t == i) ? true : false, s[i].name, !s[i].play)
            }
            setcorc(s[0].checkOrCall)
            setTable(s[0].table)
            setround(s[0].round)
            setcheckWinner(s[0].useWinner)
        }
    }
    useEffect(() => { state() }, [])

    return (
        <>
            <div className="game">
                <div className={`neterror ${throww && "comein"} ${throwwback && "comeout"}`}><div><h2>Check Network Connection</h2></div></div>
                <div style={{ display: iswinning ? "flex" : "none" }} className="winnerscreen"><div className="winnerback"><h2>{roundwinner} won!</h2></div></div>
                <button type='button' className='gameexit' onClick={() => { setquit(true) }}>
                    <span className='gameexitIcon'></span>
                    <span className='gameexitLabel'>Exit</span>
                </button>
                {quit &&
                    <div className="raisemenuback quitmenuback">
                        <div className="raisemenu quitmenu">
                            <button onClick={() => { setquit(false) }} className="exit">X</button>
                            <p>Are you sure you want to quit this game?</p>
                            <button type="button" onClick={quitGame} className="quitmenubutton quitconfirm">Quit Game</button>
                        </div>
                    </div>
                }
                <div className="choosewinnerback" style={{ display: checkWinner ? "flex" : "none" }}>
                    <div className="choosewinner">
                        <h2>Choose Winner</h2>
                        <div className="winnergrid">
                            <div className={`center ${selected1 && "selected"} `} style={tableOrderer(1)}><button disabled={folded1} onClick={() => { select(1) }} className={`winnerbanner ${folded1 && "disabled"}`} ><h3>{player1}</h3></button></div>
                            <div className={`center ${selected2 && "selected"} `} style={tableOrderer(2)}><button disabled={folded2} onClick={() => { select(2) }} className={`winnerbanner ${folded2 && "disabled"}`}><h3>{player2}</h3></button></div>
                            <div className={`center ${selected3 && "selected"} `} style={{ ...tableOrderer(3), ...(!playing3 && { display: "none" }) }}><button disabled={folded3} onClick={() => { select(3) }} className={`winnerbanner ${folded3 && "disabled"}`}><h3>{player3}</h3></button></div>
                            <div className={`center ${selected4 && "selected"} `} style={{ ...tableOrderer(4), ...(!playing4 && { display: "none" }) }}><button disabled={folded4} onClick={() => { select(4) }} className={`winnerbanner ${folded4 && "disabled"}`}><h3>{player4}</h3></button></div>
                            <div className={`center ${selected5 && "selected"} `} style={{ ...tableOrderer(5), ...(!playing5 && { display: "none" }) }}><button disabled={folded5} onClick={() => { select(5) }} className={`winnerbanner ${folded5 && "disabled"}`}><h3>{player5}</h3></button></div>
                            <div className={`center ${selected6 && "selected"} `} style={{ ...tableOrderer(6), ...(!playing6 && { display: "none" }) }}><button disabled={folded6} onClick={() => { select(6) }} className={`winnerbanner ${folded6 && "disabled"}`}><h3>{player6}</h3></button></div>
                            <div className="winbut" style={{ gridRow: "2/4", gridColumn: 2 }}><button className={`${reddish && "reddishb"}`} onClick={win} ><h3>Confirm</h3></button></div>
                        </div>
                    </div>
                </div>
                <button type='button' className='undo' onClick={undo} aria-label='Undo last action'>
                    <span className='undoIcon' aria-hidden='true'></span>
                    <span className='undoLabel' aria-hidden='true'>Undo</span>
                </button>
                <div style={{ display: raising ? "flex" : "none" }} className="raisemenuback"><div className="raisemenu"><button onClick={() => { setraise(false); setr(false) }} className='exit'>X</button><h2>How much?</h2><input className={`${reddish && "reddish"}`} type="text" name='raise' value={raisenum} onChange={(e) => { setrnum(e.target.value) }} placeholder='Enter Amount' /> <button type='button' onClick={raisebtn} className='raisebutton'>Raise</button></div></div>
                <div className="table"></div>
                <div className="playersgrid appear">
                    <div className='center tableinfo' style={{ gridRow: "2/4", gridColumn: 2, height: "100%" }}><h3>Round : {round}</h3><h2>{table} €</h2></div>
                    <div className="player" style={tableOrderer(1)}><div className={`banner ${folded1 && "fold"} ${current1 && "active"}`}><h3>{player1}</h3><h3>{chips1}</h3></div></div>
                    <div className="player" style={tableOrderer(2)}><div className={`banner ${folded2 && "fold"} ${current2 && "active"}`}><h3>{player2}</h3><h3>{chips2}</h3></div></div>
                    <div className="player" style={{ ...tableOrderer(3), ...(!playing3 && { display: "none" }) }}><div className={`banner ${folded3 && "fold"} ${current3 && "active"}`}><h3>{player3}</h3><h3>{chips3}</h3></div></div>
                    <div className="player" style={{ ...tableOrderer(4), ...(!playing4 && { display: "none" }) }}><div className={`banner ${folded4 && "fold"} ${current4 && "active"}`}><h3>{player4}</h3><h3>{chips4}</h3></div></div>
                    <div className="player" style={{ ...tableOrderer(5), ...(!playing5 && { display: "none" }) }}><div className={`banner ${folded5 && "fold"} ${current5 && "active"}`}><h3>{player5}</h3><h3>{chips5}</h3></div></div>
                    <div className="player" style={{ ...tableOrderer(6), ...(!playing6 && { display: "none" }) }}><div className={`banner ${folded6 && "fold"} ${current6 && "active"}`}><h3>{player6}</h3><h3>{chips6}</h3></div></div>
                </div>
                <div className="bottombuttons appear">
                    {checkorcall ?
                        (<div className='center'><div className={`${holdingcall && "btnhold"}`}><button style={{ zIndex: "999" }} className={`call`} onPointerDown={() => { setcall(true); }} onPointerUp={() => { setcall(false) }} ><h3>{raisenum}</h3></button></div></div>)
                        :
                        (<div className='center'><div className={`${holdingcheck && "btnhold"}`}><button style={{ zIndex: "999" }} className={`check`} onPointerDown={() => { setcheck(true); }} onPointerUp={() => { setcheck(false) }} ><h3>check</h3></button></div></div>)}
                    <div className='center'><div className={`${holdingfold && "btnhold"}`}><button style={{ zIndex: "999" }} className={`fold`} onPointerDown={() => { setfold(true); }} onPointerUp={() => { setfold(false) }} ><h3>fold</h3></button></div></div>
                    <div className='center'><div className={`${holdingraise && "btnhold"}`}><button style={{ zIndex: "999" }} className={`raise`} onPointerDown={() => { setraise(true); }} onPointerUp={() => { setraise(false) }} ><h3>raise</h3></button></div></div>
                </div>
            </div>
        </>)
}

export default Game
