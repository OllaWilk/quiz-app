import { useEffect, useState } from 'react';
import './QuestionTimer.scss';

interface Props {
  timeout: number;
  mode: string;
  onTimeOut: (() => void) | null;
}

export const QuestionTimer = ({ timeout, onTimeOut, mode }: Props) => {
  const [remainingTime, setRemainingTime] = useState<number>(timeout);

  useEffect(() => {
    if (onTimeOut) {
      const timer = setTimeout(onTimeOut, timeout);
      return () => clearTimeout(timer);
    }
  }, [timeout, onTimeOut]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id='question-time'
      max={timeout}
      value={remainingTime}
      className={mode}
    />
  );
};
