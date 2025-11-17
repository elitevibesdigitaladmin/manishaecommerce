import React, { useEffect, useState } from 'react';
import styles from './MiniAnalogClock.module.css'; // ✅ updated path

const MiniAnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const secondsDeg = time.getSeconds() * 6;
  const minutesDeg = time.getMinutes() * 6 + time.getSeconds() * 0.1;
  const hoursDeg =
    ((time.getHours() % 12) / 12) * 360 + time.getMinutes() * 0.5;

  return (
    <div className={styles['mini-clock']}>
      <div
        className={`${styles.hand} ${styles['hour-hand']}`}
        style={{ transform: `rotate(${hoursDeg}deg)` }}
      />
      <div
        className={`${styles.hand} ${styles['minute-hand']}`}
        style={{ transform: `rotate(${minutesDeg}deg)` }}
      />
      <div
        className={`${styles.hand} ${styles['second-hand']}`}
        style={{ transform: `rotate(${secondsDeg}deg)` }}
      />
      <div className={styles['center-dot']} />
    </div>
  );
};

export default MiniAnalogClock;
