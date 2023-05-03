import React from 'react';
import { Times } from '../constants';

interface DayMarkProps {
  day: Date;
  timelineStart: Date;
}

const DayMark = ({ day, timelineStart }: DayMarkProps): JSX.Element => {
  const dayOfMonth = day.getDate();
  const top = Math.floor((day.getTime() - timelineStart.getTime()) / Times.MsPerPx);

  return (
    <div
      className="w-[42px] h-[42px] absolute px-2 py-2 border rounded-full bg-black"
      style={{ top }}
    >
      <span>{dayOfMonth}</span>
    </div>
  );
};

export default DayMark;
