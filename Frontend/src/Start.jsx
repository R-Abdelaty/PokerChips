import { use, useState } from 'react'
import { useEffect } from 'react'
import chip from "./graphics/redchip.webp";
import pic from "./graphics/pic.webp";
import React, { useRef } from "react";
import { postrec } from './App';
import './App.css'
import './start.css'


function Start({ width, Switch,playerN,setN }) {


  const [holdingstart, setstart] = useState(false)
  const [holdingplay, setplay] = useState(false)
  const [started, start] = useState(false)
  const [startedback, startb] = useState(false)
  const [ingame, setgame] = useState(false)


  const [chipN, setc] = useState(5000)
  const [miniplay, setmini] = useState([])

  const formRef = useRef(null);
  const timeoutref = useRef(null);



  //Holding buttons functionality
  useEffect(() => {
    if (holdingplay) {
      timeoutref.current = setTimeout(() => {
        if (holdingplay) {
          formRef.current.requestSubmit();
          setTimeout(() => {
            Switch()
          }, 2000);
          setplay(false)
          setgame(true)
        }
      }, 500)
    }
    else { clearTimeout(timeoutref.current); }
  }, [holdingplay])

  useEffect(() => {
    if (holdingstart) { timeoutref.current = setTimeout(() => { if (holdingstart) { flip(started, start, startedback, startb); } }, 500) }
    else { clearTimeout(timeoutref.current); }
  }, [holdingstart])
  //--------------------------------------

  // Players init
  const miniplayers =
    [<div id='player1' className="player"><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player1" /></div></div>,
    <div id='player2' className="player"><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player2" /></div></div>,
    <div id='player3' className="player"><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player3" /></div></div>,
    <div id='player4' className="player"><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player4" /></div></div>,
    <div id='player5' className="player"><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player5" /></div></div>,
    <div id='player6' className="player"><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player6" /></div></div>]

  //--------------------

  // useful repeated functions
  const flip = (a, af, b, bf) => { if (!a) { af(true); bf(false) } else { af(false); bf(true) } }
  const centered = (G, O, J = "change") => { return { display: "flex", justifyContent: J, alignItems: "center", gap: G, flexDirection: O } }
  const handleContextMenu = (e) => { e.preventDefault(); }; // Stops the menu and the vibration
  function submitManually() { formRef.current.requestSubmit(); }

  //---------------------



  // Function to initalize players and handle their display
  const createPlayers = (chip, names) => {
    let PLayers = []
    for (let i = 0; i < playerN; i++) {
      PLayers.push({ [(names[i] != "") ? names[i] : `Guest${i + 1}`]: chip })
    }

    postrec("player", PLayers)
  }

  useEffect(() => {
    setmini(fixTableOrderINP(playerN))
  }, [playerN])

  //------------------------

  //start Settings submit
  const subm = (e) => {
    e.preventDefault();
    let data = new FormData(e.target)
    let chipInput = Number(data.get("chips"))
    if (!Number.isFinite(chipInput) || chipInput <= 0) {
      //throw visible error here----------------------------------------------------------!!!!!
    }

    else {
      let names = []
      for (let m = 0; m < playerN; m++) {
        names.push(data.get(`player${m + 1}`))
      }
      postrec("start", "")
      console.log("started")
      createPlayers(chipInput, names)
    }
  }
  //----------------------


  // start screen table order fixer

  const fixTableOrderINP = (n) => {
    switch (n) {
      case 0:
        return [];
      case 1:
        return [];
      case 2:
        return ([
          <div id='player1' className="player" style={{ gridColumn: 2, gridRow: 1 }}><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player1" /></div></div>,
          <div id='player2' className="player" style={{ gridColumn: 2, gridRow: 4 }}><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player2" /></div></div>
        ]);
      case 3:
        return ([
          <div id='player1' className="player" style={{ gridColumn: 2, gridRow: 1 }}><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player1" /></div></div>,
          <div id='player2' className="player" style={{ gridColumn: 3, gridRow: "2/4" }}><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player2" /></div></div>,
          <div id='player3' className="player" style={{ gridColumn: 1, gridRow: "2/4" }}><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player3" /></div></div>
        ]);
      case 4:
        return ([
          <div id='player1' className="player" style={{ gridColumn: 2, gridRow: 1 }}><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player1" /></div></div>,
          <div id='player2' className="player" style={{ gridColumn: 3, gridRow: "2/4" }}><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player2" /></div></div>,
          <div id='player3' className="player" style={{ gridColumn: 2, gridRow: 4 }}><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player3" /></div></div>,
          <div id='player4' className="player" style={{ gridColumn: 1, gridRow: "2/4" }}><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player4" /></div></div>
        ]);
      case 5:
        return ([
          <div id='player1' className="player" style={{ gridColumn: 2, gridRow: 1 }}><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player1" /></div></div>,
          <div id='player2' className="player" style={{ gridColumn: 3, gridRow: 2 }}><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player2" /></div></div>,
          <div id='player3' className="player" style={{ gridColumn: 3, gridRow: 3 }}><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player3" /></div></div>,
          <div id='player4' className="player" style={{ gridColumn: 1, gridRow: 3 }}><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player4" /></div></div>,
          <div id='player5' className="player" style={{ gridColumn: 1, gridRow: 2 }}><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player5" /></div></div>
        ]);
      case 6:
        return ([
          <div id='player1' className="player" style={{ gridColumn: 2, gridRow: 1 }}><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player1" /></div></div>,
          <div id='player2' className="player" style={{ gridColumn: 3, gridRow: 2 }}><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player2" /></div></div>,
          <div id='player3' className="player" style={{ gridColumn: 3, gridRow: 3 }}><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player3" /></div></div>,
          <div id='player4' className="player" style={{ gridColumn: 2, gridRow: 4 }}><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player4" /></div></div>,
          <div id='player5' className="player" style={{ gridColumn: 1, gridRow: 3 }}><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player5" /></div></div>,
          <div id='player6' className="player" style={{ gridColumn: 1, gridRow: 2 }}><div className="banner"><input className="playerinp" placeholder='name...' type="text" name="player6" /></div></div>
        ]);
      default:
        return [];
    }
  }

  //---------------------------------------------




  return (<>
    <div className={`startmenu ${started && "started"} ${startedback && "startedback"} `}>
      <div className="welcomeScreen">
        <h1 className="nabla">WELCOME TO<br></br> <span className="red">POKERCHIPS</span></h1>
        <div className='btnC'><div className={`${holdingstart && "starthold"}`}><button className="start" onContextMenu={handleContextMenu} onPointerDown={() => { setstart(true); }} onPointerUp={() => { setstart(false) }}><h3>START</h3></button></div></div>
      </div>
      <form onSubmit={subm} ref={formRef} >
        <div className={`startsettings ${ingame && "middle"}`}>
          <div className={`backdiv ${ingame && "disappear"}`} ><button className="back" onClick={() => { flip(started, start, startedback, startb); setstart(false) }}></button></div>
          <div className={`gameDetails ${ingame && "disappear"}`}>
            <div style={{ ...centered("0px", "row", "space-evenly"), width: width }}>
              <div style={centered("0px", "column")}>
                <h4>Players</h4>
                <div style={{ display: "flex", gap: "0.7rem" }}>
                  <button type="button" className="valuebtn" onClick={() => { if (playerN > 2) setN(playerN - 1) }}>-</button>
                  <input name='playerN' type="text" placeholder='Players' value={playerN} onChange={(e) => { setN(e.target.value) }} />
                  <button type="button" className="valuebtn" onClick={() => { if (playerN < 6) setN(playerN + 1) }}>+</button>

                </div>
              </div>
              <div style={centered("0px", "column")}>
                <h4>Starting Chips</h4>
                <div style={{ display: "flex", gap: "0.7rem" }}>
                  <input name='chips' type="text" placeholder='Chips' value={chipN} onChange={(e) => { setc(e.target.value) }} />
                  <h3>x</h3>
                  <img src={chip} />
                </div>
              </div>
            </div>
          </div>

          <div className="minitablediv">
            <div className={`minitable ${ingame && "minitablestart"} `}><div style={{ zIndex: "999" }} className={` ${holdingplay && "btnhold"} ${ingame && "disappear"}`}><button type='button' onPointerDown={() => { setplay(true); }} onPointerUp={() => { setplay(false) }}><div>Play</div></button></div></div>
            <div className={`minigrid ${ingame && "disappear"}`}>
              {miniplay}
            </div>
          </div>
        </div>
      </form>


    </div>
  </>)
}
export default Start