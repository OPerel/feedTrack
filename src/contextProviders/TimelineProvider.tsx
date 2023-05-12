import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import getNextMidnight from '../utils/getNextMidnight';
import { DAYS_TO_LOAD } from '../constants';

interface TimelineProvider {
  timelineEnd: Date;
  timelineStart: Date;
  weeks: number;
  setWeeks: Dispatch<SetStateAction<number>>;
}

const TimelineContext = createContext<TimelineProvider>({} as TimelineProvider);

export const useTimelineContext = () => useContext(TimelineContext);

const TimelineContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [weeks, setWeeks] = useState<number>(1);
  const [timelineEnd] = useState<Date>(() => getNextMidnight());

  const getTimelineStartFromEndAndRange = useCallback(() => {
    const date = new Date(timelineEnd);
    date.setDate(timelineEnd.getDate() - DAYS_TO_LOAD * weeks);
    return date;
  }, [timelineEnd, weeks]);

  const [timelineStart, setTimelineStart] = useState<Date>(
    getTimelineStartFromEndAndRange
  );

  useEffect(() => {
    setTimelineStart(getTimelineStartFromEndAndRange);
  }, [getTimelineStartFromEndAndRange]);

  return (
    <TimelineContext.Provider
      value={{
        timelineEnd,
        timelineStart,
        weeks,
        setWeeks,
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
};

export default TimelineContextProvider;
