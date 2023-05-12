import { useRef, useState } from 'react';
import { DAYS_TO_LOAD, Times } from '../constants';
import Feels from './Feels';
import { useTimelineContext } from '../contextProviders/TimelineProvider';
import useDaysRangeInMs from '../utils/useDaysRangeInMs';
import Days from './Days';
import Months from './Months';
import Meals from './Meals';
import FeelingPlot from './FeelingPlot';
import useFeels from '../apollo/queries/useFeels';
import useFetchMoreOnUpdateTimeline from '../utils/useFetchMoreOnUpdateTimeline';
import useMeals from '../apollo/queries/useMeals';
import useScrollToUpdatedTimelinePosition from '../utils/useScrollToUpdatedTimelinePosition';
import CurrentMonth from './CurrentMonth';
import TimelineLine from './TimelineLine';
import TimelineLoader from './TimelineLoader';

const ItemsTimeline = (): JSX.Element => {
  const { timelineStart, timelineEnd } = useTimelineContext();
  const [month, setMonth] = useState(
    timelineEnd.toLocaleString('default', { month: 'long' })
  );

  const days = useDaysRangeInMs();
  const timelineLengthInPx = (Times.DayInMs * days) / Times.MsPerPx;

  const scrollableRef = useRef<HTMLDivElement | null>(null);

  const newRangeEnd = new Date(timelineStart.getTime() + Times.DayInMs * DAYS_TO_LOAD);
  const { feelsData, fetchMoreFeels } = useFeels(newRangeEnd, timelineStart);
  const { mealsData, fetchMoreMeals } = useMeals(newRangeEnd, timelineStart);

  useFetchMoreOnUpdateTimeline(fetchMoreFeels, fetchMoreMeals, {
    lt: newRangeEnd,
    gt: timelineStart,
  });
  useScrollToUpdatedTimelinePosition(timelineLengthInPx, scrollableRef);

  return (
    <div ref={scrollableRef} className="overflow-y-scroll w-screen mt-16 bg-slate-800">
      <div className="flex justify-center w-screen h-[85vh] mx-auto my-auto relative">
        <CurrentMonth month={month} />

        <TimelineLoader feels={feelsData?.feels} meals={mealsData?.meals} />

        <TimelineLine timelineLengthInPx={timelineLengthInPx} />
        <Days />
        <Months setMonth={setMonth} />
        <Feels data={feelsData} />
        <Meals data={mealsData} />
        {feelsData?.feels && (
          <FeelingPlot feels={feelsData.feels} timelineLengthInPx={timelineLengthInPx} />
        )}
      </div>
    </div>
  );
};

export default ItemsTimeline;
