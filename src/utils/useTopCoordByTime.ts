import { Times } from '../constants';
import { useTimelineContext } from '../contextProviders/TimelineProvider';

const useTopCoordByTime = (time: Date): number => {
  const { timelineStart } = useTimelineContext();
  return Math.floor((time.getTime() - timelineStart.getTime()) / Times.MsPerPx);
};

export default useTopCoordByTime;
