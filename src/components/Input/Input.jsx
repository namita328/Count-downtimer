import React, { useState, useEffect } from "react";
import BlackHourGlass from "../../assets/Black_Hourglass_icon.svg";
import styles from "../Input/input.module.css";

const Input = ({ targetDate, setTargetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [timerActive, setTimerActive] = useState(false);
  const [error, setError] = useState("");
  const [buttonText, setButtonText] = useState("Start Timer");
  const [timerOver, setTimerOver] = useState(false);

  useEffect(() => {
    let intervalId;

    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      if (difference > 0) {
        let remainingSeconds = Math.floor(difference / 1000);
        const days = Math.floor(remainingSeconds / (3600 * 24));
        remainingSeconds %= 3600 * 24;
        const hours = Math.floor(remainingSeconds / 3600);
        remainingSeconds %= 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        return { days, hours, minutes, seconds };
      } else {
        setTimerActive(false);
        setTimerOver(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    if (timerActive) {
      intervalId = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      setButtonText("Cancel Timer");
    } else {
      setButtonText("Start Timer");
    }

    return () => clearInterval(intervalId);
  }, [targetDate, timerActive]);

  useEffect(() => {
    console.log("settimerover");
    setTimerOver(false);
  }, [targetDate]);

  const handleTimerToggle = () => {
    if (timerActive) {
      setTimerActive(false);
      setButtonText("Start Timer");
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      const differenceInDays =
        (new Date(targetDate) - new Date()) / (1000 * 60 * 60 * 24);
      if (differenceInDays > 100) {
        setError("Selected date is more than 100 days");
      } else {
        setTimerActive(true);
        setError("");
        setButtonText("Cancel Timer");
      }
    }
  };

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 99);
  const maxDateString = maxDate.toISOString().split("T")[0];

  return (
    <>
      <div className={styles.container}>
        <img
          src={BlackHourGlass}
          alt="Hourglass"
          className={styles.hourImage}
        />
        <h1>
          CountDown <span style={{ color: "#ffc2d1" }}>Timer</span>
        </h1>
        <div className={styles.inputDate}>
          <input
            type="datetime-local"
            className={styles.targetDate}
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            max={maxDateString}
          />
        </div>
        <button
          className={styles.timerButton}
          onClick={handleTimerToggle}
          disabled={!targetDate}
        >
          {buttonText}
        </button>
        {error && <div className={styles.error}>{error}</div>}
        {timerOver && <div>Your countdown timer is over!</div>}
      </div>
      {!error && timerActive && !timerOver && (
        <div className={styles.div}>
          <div className={styles.divContainer}>Days: {timeLeft.days}</div>
          <div className={styles.divContainer}>Hours: {timeLeft.hours}</div>
          <div className={styles.divContainer}>Minutes: {timeLeft.minutes}</div>
          <div className={styles.divContainer}>Seconds: {timeLeft.seconds}</div>
        </div>
      )}
    </>
  );
};

export default Input;
