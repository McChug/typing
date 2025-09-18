import { useState, useRef, useEffect } from "react";

const Timer = () => {
  const [time, setTime] = useState(0); // elapsed time in ms
  const [running, setRunning] = useState(false);
  const [bpm, setBpm] = useState(120); // beats per minute
  const [points, setPoints] = useState(0); // beats per minute
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Main animation loop
  const animate = (now: number) => {
    if (startTimeRef.current !== null) {
      setTime(now - startTimeRef.current); // update elapsed time
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  const start = () => {
    if (!running) {
      startTimeRef.current = performance.now() - time; // resume from current time
      requestRef.current = requestAnimationFrame(animate);
      setRunning(true);
    }
  };

  const stop = () => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    setRunning(false);
  };

  const reset = () => {
    stop();
    setTime(0);
    startTimeRef.current = null;
  };

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Calculate seconds and milliseconds
  const seconds = Math.floor(time / 1000);
  const milliseconds = Math.floor((time % 1000) / 10); // two digits

  // Calculate beat number based on BPM
  const msPerBeat = 60000 / bpm; // how many ms per beat
  const currentBeat = Math.floor(time / msPerBeat) + 1;

  useEffect(() => {
    const handleKeyDown = () => {
      const beatIntervalMs = (60 / bpm) * 1000;
      const currentTimeMs = startTimeRef.current
        ? performance.now() - startTimeRef.current
        : 0;
      const isOnBeat =
        startTimeRef.current && Math.abs(currentTimeMs % beatIntervalMs) <= 60;

      if (isOnBeat) {
        setPoints((prev) => prev + 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [bpm]); // only bpm

  return (
    <div>
      <h2>
        {seconds}:{milliseconds.toString().padStart(2, "0")}
      </h2>
      <p>Current Beat: {currentBeat}</p>
      <p>Points: {points}</p>

      <div>
        <button onClick={start} disabled={running}>
          Start
        </button>
        <button onClick={stop} disabled={!running}>
          Stop
        </button>
        <button onClick={reset}>Reset</button>
      </div>

      <div>
        <label>BPM: </label>
        <input
          type="number"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Timer;
