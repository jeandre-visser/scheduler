import React, { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = newMode => { setMode(newMode) };
  const back = () => {

  }

  return {
    mode,
    transition,
    back
  };
}

export default useVisualMode;