import MonthMark from './MonthMark';
import { useTimelineContext } from '../contextProviders/TimelineProvider';
import useDaysRangeInMs from '../utils/useDaysRangeInMs';
import { Dispatch, SetStateAction } from 'react';

interface MonthsProps {
  setMonth: Dispatch<SetStateAction<string>>;
}

const Months = ({ setMonth }: MonthsProps): JSX.Element => {
  const { timelineEnd, timelineStart } = useTimelineContext();
  const days = useDaysRangeInMs();

  const monthArray: Date[] = [];
  for (let i = 0; i <= days; i++) {
    const date = new Date(timelineEnd);
    date.setDate(timelineEnd.getDate() - i);
    if (i > 0 && date.getDate() === 1) {
      monthArray.unshift(date);
    }
  }

  return (
    <>
      {monthArray.map((d) => (
        <MonthMark
          key={d.getMonth()}
          date={d}
          timelineStart={timelineStart}
          setMonth={setMonth}
        />
      ))}
    </>
  );
};

export default Months;
