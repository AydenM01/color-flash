import { Box, TextField, Button } from "@mui/material";
import useSound from "use-sound";

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";

function App() {
  const [startTime, setStartTime] = useState(1);
  const [waitTime, setWaitTime] = useState(1);
  const [started, setStarted] = useState(false);
  const [rand, setRand] = useState(0);
  const [log, setLog] = useState([]);
  const [fullIntervalState, setFullInterval] = useState(null);
  const [timeout1, setTimer1] = useState(null);
  const [timeout2, setTimer2] = useState(null);

  const [go] = useSound("/go.mp3", { volume: 1 });
  const [stop] = useSound("/stop.mp3", { volume: 1 });
  const [pause] = useSound("/pause.mp3", { volume: 1 });
  const [ready] = useSound("/readyTone.mp3", { volume: 1 });

  const handleStartChange = (value) => {
    console.log("changing start time to " + value);
    setStartTime(parseInt(value));
  };

  const handleWaitChange = (value) => {
    console.log("changing wait time to " + value);
    setWaitTime(parseInt(value));
  };

  const handleStart = () => {
    console.log("starting");
    setStarted(true);
  };

  const handleStop = () => {
    console.log("stopping");
    setStarted(false);
  };

  const checkForTriple = (num) => {
    console.log("checking for triple");
    let currLen = log.length;
    let check =
      currLen >= 2 && num === log[currLen - 1] && num === log[currLen - 2];

    if (check) {
      console.log("triple found!");
      return true;
    }
  };

  const handleTriple = (num) => {
    let newRand = Math.floor(Math.random() * 2);
    if (num === 0) {
      if (newRand === 0) {
        return 1;
      } else {
        return 2;
      }
    } else if (num === 1) {
      if (newRand === 0) {
        return 0;
      } else {
        return 2;
      }
    } else {
      if (newRand === 0) {
        return 0;
      } else {
        return 1;
      }
    }
  };

  const repetition = () => {
    console.log("starting repetition");
    console.log(log);
    //let newRand = Math.floor(Math.random() * 3);
    let newRand = 0;
    let nextColor;

    if (checkForTriple(newRand)) {
      console.log("triple detected");
      nextColor = handleTriple(newRand);
    } else {
      nextColor = newRand;
    }

    log.push(nextColor);

    const timer1 = setTimeout(() => {
      console.log("Counting before get Ready");
      ready();
    }, startTime * 1000);

    setTimer1(timer1);

    const timer2 = setTimeout(() => {
      console.log("Counting before g/s/p");
      if (nextColor === 0) {
        go();
      } else if (nextColor === 1) {
        stop();
      } else {
        pause();
      }
      setRand(nextColor);
    }, (startTime + waitTime) * 1000);

    setTimer2(timer2);
  };

  useEffect(() => {
    console.log("use effect called");
    if (started) {
      repetition();

      const fullInterval = setInterval(() => {
        repetition();
      }, (startTime + waitTime) * 1000);

      setFullInterval(fullInterval);

      return () => {
        clearInterval(fullInterval);
        setFullInterval(null);
      };
    } else {
      if (fullIntervalState) {
        clearInterval(fullIntervalState);
        setFullInterval(null);
      }
      if (timeout1) {
        clearTimeout(timeout1);
        setTimer1(null);
      }
      if (timeout2) {
        clearTimeout(timeout2);
        setTimer2(null);
      }
    }
  }, [started]);

  return (
    <div>
      <TextField
        type="number"
        label="Start Time (seconds)"
        onChange={(e) => handleStartChange(e.target.value)}
        style={{}}
      ></TextField>

      <TextField
        type="number"
        label="Wait Time (seconds)"
        onChange={(e) => handleWaitChange(e.target.value)}
      ></TextField>

      {started ? (
        <Button
          color="error"
          variant="contained"
          onClick={handleStop}
          style={{ padding: 15 }}
        >
          Stop
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleStart}
          style={{ padding: 15 }}
        >
          Start
        </Button>
      )}

      {rand === 0 && (
        <Box
          style={{ backgroundColor: "green", width: "100vw", height: "100vh" }}
        ></Box>
      )}
      {rand === 1 && (
        <Box
          style={{ backgroundColor: "red", width: "100vw", height: "100vh" }}
        ></Box>
      )}
      {rand === 2 && (
        <Box
          style={{ backgroundColor: "yellow", width: "100vw", height: "100vh" }}
        ></Box>
      )}
    </div>
  );
}

export default App;
