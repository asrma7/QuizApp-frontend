import "./Timer.css";

import React, { useEffect, useState } from "react";

const Timer = ({ startTime, timerActive }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;
    // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
    if (timerActive) {
      intervalId = setInterval(
        () => setTime((new Date() - startTime) / 10),
        1000
      );
    }
    return () => clearInterval(intervalId);
  }, [time, timerActive, startTime]);

  // Hours calculation
  const hours = Math.floor(time / 360000).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  return (
    <div className="timer">
      ⏱{hours}:{minutes}:{seconds}
    </div>
  );
};

export default Timer;
