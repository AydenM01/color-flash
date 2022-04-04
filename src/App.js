import { Box, TextField } from "@mui/material";
import useSound from "use-sound";

import React, {
  useEffect,
  useRef,
  useState,
  createRef,
  VideoHTMLAttributes,
  useCallback,
} from "react";

function App() {
  const [time, setTime] = useState(5);
  const [rand, setRand] = useState(0);

  const [one] = useSound("/one.mp3", { volume: 1 });
  const [two] = useSound("/two.mp3", { volume: 1 });

  const handleChange = (value) => {
    console.log("changing time to " + value);
    setTime(value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("This will run every time interval!");
      let newRand = Math.floor(Math.random() * 2);
      console.log(newRand);
      console.log(time);
      if (newRand == 0) {
        one();
      } else {
        two();
      }
      setRand(newRand);
    }, time * 1000);
    return () => clearInterval(interval);
  }, [time]);

  return (
    <div>
      <TextField
        type="number"
        label="Wait Time (seconds)"
        onChange={(e) => handleChange(e.target.value)}
      ></TextField>

      {rand === 0 ? (
        <Box
          style={{ backgroundColor: "blue", width: "100vw", height: "100vh" }}
        ></Box>
      ) : (
        <Box
          style={{ backgroundColor: "red", width: "100vw", height: "100vh" }}
        ></Box>
      )}
    </div>
  );
}

export default App;
