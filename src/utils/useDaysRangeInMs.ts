import { Times } from '../constants';
import { useTimelineContext } from '../contextProviders/TimelineProvider';

const useDaysRangeInMs = () => {
  const { timelineEnd, timelineStart } = useTimelineContext();
  return (timelineEnd.getTime() - timelineStart.getTime()) / Times.DayInMs;
};

export default useDaysRangeInMs;
