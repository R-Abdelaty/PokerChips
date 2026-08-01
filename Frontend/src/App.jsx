import { use, useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import chip from "./graphics/redchip.webp";
import pic from "./graphics/pic.webp";
import React, { useRef } from "react";
import Start from './Start.jsx'
import Game from './Game.jsx'
import { getid } from './Start.jsx';
//const url = "localhost:8080"
const url = "10.102.213.191:8080"
// Api call POST and GET function
export const postrec = async (r, b, err) => {
  const cont = new AbortController();
  setTimeout(() => {
    cont.abort()
  }, 4000);
  try {
    const res = await fetch(`http://${url}/poker/${getid()}${r}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(b),
      signal: cont.signal
    });

    const result = await res.text();
    console.log(result)
    return result;

  } catch (error) {
    err()
    return false;
  }
}
export const getrec = async (r, err) => {
  const cont = new AbortController();
  setTimeout(() => {
    cont.abort()
  }, 4000);
  try {
    const res = await fetch(`http://${url}/poker/${getid()}${r}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: cont.signal
    });

    const result = await res.json();
    console.log(result)
    return result;

  } catch (error) {
    err()
    return false;
  }
}

const getGameIdFromUrl = () => {
  const match = window.location.pathname.match(/^\/([^/]+)$/);
  return match ? match[1] : null;
};
// -------------------



function App() {

  const [playerN, setN] = useState(2)

  const [width, setw] = useState("0px")
  const id = getGameIdFromUrl()
  const [screen, setScreen] = useState(id ? "game":"start")

  // Updates the (--width) css variable on real width changes and ignores keyboard size change (Ai helped here).
  const lastWidthRef = useRef(window.innerWidth);

  useEffect(() => {
    function calculateWidth() {
      return Math.min(window.innerWidth, 0.8182 * window.innerHeight) + "px";
    }

    function update() {
      const currentWidth = window.innerWidth;

      if (currentWidth === lastWidthRef.current) {
        return;
      }

      lastWidthRef.current = currentWidth;
      setw(calculateWidth());
    }

    function forceUpdate() {
      lastWidthRef.current = window.innerWidth;
      setw(calculateWidth());
    }

    forceUpdate();

    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", forceUpdate);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", forceUpdate);
    }
  }, []);

  //-------------------------

  // 




  return (
    <>

      <div className="appRoot" style={{ "--width": width }}>
        <div className="screen" style={{ zIndex: "999" }}>
          <div className="background" style={{ zIndex: "-1" }}></div>
          {screen == "start" && <Start w={width} playerN={playerN} setN={setN} Switch={() => { setScreen("game") }} />}

          {screen == "game" && <Game w={width} playern={playerN} />}

        </div>
      </div>
    </>
  )

}
export default App
