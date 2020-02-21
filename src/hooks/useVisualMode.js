import { useState } from "react";

export default function useVisualMode(initial) {
  //start with initial mode
  const [history, setHistory] = useState([initial]);

 
  // adds new mode to history everytime(act as switch)
  const transition = (mode, replace = false) => {
    //if replace is true then set history to reflect we are replacing current mode
    if (replace === true) {
      const newHistory = [...history].slice(0, history.length - 1);
      setHistory(prev => [...newHistory, mode]);
    } else {
      setHistory (prev=> [...history, mode]);
    }
  }
   //set the mode to prev item in history array
   const back =() => {
     //useVisualMode should not return to previous mode if already at initial
    if (history.length>1) {
      const newHistory = [...history].slice(0, history.length - 1);
      setHistory(prev => newHistory);
    }
  }

 

  return { mode:history[history.length-1] , transition, back };
}
