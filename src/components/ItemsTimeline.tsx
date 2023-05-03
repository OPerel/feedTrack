import React, { useState } from 'react';
import DayMark from './DayMark';
import { Times } from '../constants';
import getNextMidnight from '../utils/getNextMidnight';
import MonthMark from './MonthMark';

// import { Feel, Meal } from '../../types';

interface ItemsTimelineProps {
  // type: 'meals' | 'feels';
  // items: Meal[] | Feel[];
}

const ItemsTimeline = (props: ItemsTimelineProps): JSX.Element => {
  const timelineEnd = getNextMidnight();
  const daysToLoad = 7;
  const timelineStart = new Date(timelineEnd);
  timelineStart.setDate(timelineEnd.getDate() - daysToLoad);

  const daysArray: Date[] = [];
  for (let i = 0; i <= daysToLoad; i++) {
    const date = new Date(timelineEnd);
    date.setDate(timelineEnd.getDate() - i);
    if (i > 0) {
      daysArray.unshift(date);
    }
  }

  const [month, setMonth] = useState(
    timelineEnd.toLocaleString('default', { month: 'long' })
  );

  const monthArray = daysArray.filter((d) => d.getDate() === 1);
  const lengthToDisplay = (Times.DaysInMs * daysToLoad) / Times.MsPerPx;

  return (
    <div className="flex justify-center w-12 h-[85vh] mx-auto my-auto relative">
      <div className="fixed top-8 h-8 px-4">{month}</div>
      <div
        className={`w-0.5 bg-gray-200 mx-auto`}
        style={{ height: `${lengthToDisplay}px` }}
      />
      {daysArray.map((d) => (
        <DayMark key={d.getTime()} day={d} timelineStart={timelineStart} />
      ))}
      {monthArray.map((d) => (
        <MonthMark
          key={d.getMonth()}
          date={d}
          timelineStart={timelineStart}
          setMonth={setMonth}
        />
      ))}
    </div>
  );
};

export default ItemsTimeline;
