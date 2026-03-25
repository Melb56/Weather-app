import { useState, useEffect } from "react";
import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData, unitSystem }) => {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fakeWeatherData = { ...weatherData, dt: now };

  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(fakeWeatherData)}, ${getTime(
          unitSystem,
          now,
          weatherData.timezone
        )} ${getAMPM(unitSystem, now, weatherData.timezone)}`}
      </h2>
    </div>
  );
};

