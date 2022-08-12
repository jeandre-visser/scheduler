import React, { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = newMode => { 
    setMode(newMode);
    setHistory(history => [...history, newMode]);
  };
  
  const back = () => { 
    setHistory(history => {
      const newHistory = history.length > 1 ? [...history].slice(0, -1) : [...history];
      setMode(newHistory[newHistory.length - 1]);
      return newHistory;
    })
  }

  return {
    mode,
    transition,
    back
  };
}

export default useVisualMode;