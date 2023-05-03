import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react';
import { Times } from '../constants';

interface MonthMarkProps {
  date: Date;
  timelineStart: Date;
  setMonth: Dispatch<SetStateAction<string>>;
}

const MonthMark = ({ date, timelineStart, setMonth }: MonthMarkProps): JSX.Element => {
  const month = date.toLocaleString('default', { month: 'long' });
  const top = Math.floor((date.getTime() - timelineStart.getTime()) / Times.MsPerPx) - 45;

  const ref = useRef<HTMLDivElement | null>(null);

  const prevPosition = useRef('');

  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        if (prevPosition.current === 'above') {
          const prevMonth = new Date(date);
          prevMonth.setMonth(date.getMonth() - 1);
          setMonth(prevMonth.toLocaleString('default', { month: 'long' }));
        }
        prevPosition.current = 'visible';
        return;
      }

      if (prevPosition.current === 'visible' && entry.boundingClientRect.top < 50) {
        setMonth(month);
      }

      if (entry.boundingClientRect.top > 50) {
        prevPosition.current = 'below';
      } else {
        prevPosition.current = 'above';
      }
    },
    [date, month, setMonth]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect);

    observer.observe(ref.current as Element);
  }, [handleIntersect]);

  return (
    <div
      ref={ref}
      className="absolute px-4 py-1 border rounded-lg bg-black"
      style={{ top }}
    >
      <span>{month}</span>
    </div>
  );
};

export default MonthMark;
