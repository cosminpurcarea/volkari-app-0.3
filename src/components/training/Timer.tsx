import React, { useEffect, useState } from 'react';

interface TimerProps {
  seconds: number;
  onTimeout: () => void;
  isActive: boolean;
  key?: string | number;
}

export const Timer: React.FC<TimerProps> = ({ seconds, onTimeout, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!isActive) return;

    setTimeLeft(seconds);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeout, seconds]);

  const percentage = (timeLeft / seconds) * 100;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Time remaining</span>
        <span>{timeLeft}s</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-primary h-2.5 rounded-full transition-all duration-1000"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};