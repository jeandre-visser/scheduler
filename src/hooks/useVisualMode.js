import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

// Transitions into new visual mode and keeps track of previous modes in a history, or replaces previous mode if replace is true
  const transition = (newMode, replace = false) => { 
    setMode(newMode)
    setHistory(prev => {

      if(replace) {
        const newHistory = [...prev];
        newHistory.splice(-1, 1, newMode);
        return newHistory;

      } else {
        return [...prev, newMode];
      }
    }) 
  }
// Go back to previous visual mode, but cannot go back further than initial mode
  const back = () => { 
    setHistory(prev => {

      const newHistory = history.length > 1 ? [...prev].slice(0, -1) : [...prev];
  
      setMode(newHistory[newHistory.length - 1]);
        return newHistory;
    })
  }

  return { mode, transition, back };
}

export default useVisualMode;