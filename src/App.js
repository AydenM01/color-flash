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

  useEffect(() => {
    if (started) {
      const fullInterval = setInterval(() => {
        console.log("starting repetition");
        let currLog = log;
        let newRand = Math.floor(Math.random() * 3);
        currLog.push(newRand);
        console.log(currLog);

        let currLen = currLog.length;
        if (
          currLen > 3 &&
          currLog[currLen - 1] === currLog[currLen - 2] &&
          currLog[currLen - 1] === currLog[currLen - 3]
        ) {
          let newNewRand = Math.floor(Math.random() * 2);
          if (newRand === 0) {
            if (newNewRand === 0) {
              newRand = 1;
            } else {
              newRand = 2;
            }
          } else if (newRand === 1) {
            if (newNewRand === 0) {
              newRand = 0;
            } else {
              newRand = 2;
            }
          } else {
            if (newNewRand === 0) {
              newRand = 1;
            } else {
              newRand = 2;
            }
          }
          currLog = [newRand];
        }

        setLog(currLog);

        const timer = setTimeout(() => {
          console.log("Counting before get Ready");
          ready();
        }, startTime * 1000);

        const timer2 = setTimeout(() => {
          console.log("Counting before g/s/p");
          if (newRand == 0) {
            go();
          } else if (newRand == 1) {
            stop();
          } else {
            pause();
          }
          setRand(newRand);
        }, (startTime + waitTime) * 1000);
      }, (startTime + waitTime) * 1000);

      return () => clearInterval(fullInterval);
    }
  }, [started]);

  return (
    <div>
      <TextField
        type="number"
        label="Start Time (seconds)"
        onChange={(e) => handleStartChange(e.target.value)}
      ></TextField>

      <TextField
        type="number"
        label="Wait Time (seconds)"
        onChange={(e) => handleWaitChange(e.target.value)}
      ></TextField>

      <Button variant="contained" onClick={handleStart}>
        {" "}
        Start{" "}
      </Button>

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
