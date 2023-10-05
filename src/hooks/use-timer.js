import { useCallback, useState, useEffect, useRef } from 'react';

// ----------------------------------------------------------------------

export function useTimer() {
  const [timer, setTimer] = useState(0);
  const Ref = useRef(null);

  const getTime = useCallback((timer) => {
    const seconds = Math.floor((timer / 1000) % 60);
    const minutes = Math.floor((timer / 1000 / 60) % 60);
    const hours = Math.floor((timer / 1000 / 3600) % 60);

    return `${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}:${
      seconds > 9 ? seconds : `0${seconds}`
    }`;
  }, []);

  const startTimer = () => {
    if (Ref.current) clearInterval(Ref.current);

    const id = setInterval(() => {
      setTimer((prev) => prev + 1000);
    }, 1000);
    Ref.current = id;
  };

  useEffect(() => {
    startTimer();

    return () => {
      if (Ref.current) clearInterval(Ref.current);
    };
  }, []);

  return {
    timer,
    getTime,
  };
}
