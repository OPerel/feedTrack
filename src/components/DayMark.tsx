import React from 'react';

interface DayMarkProps {
  day: Date;
}

const DayMark = ({ day }: DayMarkProps): JSX.Element => {
  const dayOfMonth = day.getDate();
  const month = day.toLocaleString('default', { month: 'short' });

  return (
    <div className="w-24 ml-48">
      <span>{dayOfMonth}</span>
      &nbsp;
      <span>{month}</span>
    </div>
  );
};

export default DayMark;
