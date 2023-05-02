import React, { useEffect, useRef } from 'react';
import DayMark from './DayMark';
// import { Feel, Meal } from '../../types';

interface ItemsTimelineProps {
  // type: 'meals' | 'feels';
  // items: Meal[] | Feel[];
}

const ItemsTimeline = (): JSX.Element => {
  const today = new Date();
  const daysToLoad = 7;
  const daysArray = [];
  // daysArray.push(today);
  for (let i = 1; i <= daysToLoad; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    daysArray.unshift(date);
  }

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft += ref.current.scrollWidth;
    }
  }, []);

  return (
    <div ref={ref} className="flex overflow-scroll">
      {daysArray.map((d) => (
        <DayMark key={d.getTime()} day={d} />
      ))}
    </div>
  );
};

export default ItemsTimeline;
