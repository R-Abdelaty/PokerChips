import { use, useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import chip from "./graphics/redchip.webp";
import pic from "./graphics/pic.webp";
import React, { useRef } from "react";
import Start from './Start.jsx'
import Game from './Game.jsx'


// Api call POST and GET function
      export const postrec = async (r, b) => {
        try {
          const res = await fetch(`http://10.22.153.240:8080/poker/${r}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(b)
          });
    
          const result = await res.text();
          console.log(result)
          return result;
    
        } catch (error) {
          console.log("POST request failed:", error);
        }
      }
      export const getrec = async (r) => {
        try {
          const res = await fetch(`http://10.22.153.240:8080/poker/${r}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
    
          const result = await res.json();
          console.log(result)
          return result;
    
        } catch (error) {
          console.log("GET request failed:", error);
        }
      }
// -------------------



function App() {

  const [playerN, setN] = useState(2)

  const [width, setw] = useState("0px")
  const [screen, setScreen] = useState("start")


// Updates the (--width) css variable on window size change and playerN
      useEffect(() => {
        function update() {
          let x = (window.innerWidth > 0.8182 * window.innerHeight ? 0.8182 * window.innerHeight : window.innerWidth);
          setw(x + 1 + "px");
        }
        update();
        window.addEventListener("resize", update);
        return () => { window.removeEventListener("resize", update); }
      }
        , [window.innerWidth]);

//-------------------------

// 

    


  return (
    <>
      <div id="root" style={{ "--width": width }}>
        <div className="screen" style={{ zIndex: "999" }}>
          <div className="background" style={{ zIndex: "-1" }}></div>
          {screen =="start" && <Start w = {width} playerN={playerN} setN={setN} Switch = {()=>{setScreen("game")}}/>}
          
          {screen =="game" && <Game w = {width} playern={playerN}/>}

        </div>
      </div>
    </>
  )

}
export default App
