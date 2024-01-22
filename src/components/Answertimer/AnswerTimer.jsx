import React, { useEffect, useState,useRef } from "react";
import "./AnswerTimer.scss";

function AnswerTimer({ duration, onTimeUp }) {
  const [counter, setCounter] = useState(0);
  const [progressLoaded, setProgressLoaded] = useState(0);
  const intervalRef= useRef();


  useEffect(() => {
     intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 1);
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalRef.current);
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    setProgressLoaded(100 * (counter / duration));

    if (counter === duration) {
      
      clearInterval(intervalRef.current)

      setTimeout(() => {
        onTimeUp();
      }, 1000);
    }
  }, [counter]);

  return (
    <div className="answer-timer-container">
      <div
        style={{
          width: `${progressLoaded}%`,
          backgroundColor:`${
            progressLoaded < 40
              ? "lightgreen"
              :progressLoaded < 70
              ? "orange" 
              : "red"           
          }`,
        }}
        className="progress"
      ></div>
    </div>
  );
}

export default AnswerTimer;
