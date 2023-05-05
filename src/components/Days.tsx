import DayMark from './DayMark';
import { useTimelineContext } from '../contextProviders/TimelineProvider';
import useDaysRangeInMs from '../utils/useDaysRangeInMs';

const Days = (): JSX.Element => {
  const { timelineEnd, timelineStart } = useTimelineContext();
  const days = useDaysRangeInMs();

  const daysArray: Date[] = [];
  for (let i = 0; i <= days; i++) {
    const date = new Date(timelineEnd);
    date.setDate(timelineEnd.getDate() - i);
    if (i > 0) {
      daysArray.unshift(date);
    }
  }

  return (
    <>
      {daysArray.map((d) => (
        <DayMark key={d.getTime()} day={d} timelineStart={timelineStart} />
      ))}
    </>
  );
};

export default Days;
