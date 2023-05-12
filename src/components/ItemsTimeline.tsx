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
import useIncreaseTimeLineOnscrollEnd from '../utils/useIncreaseTimeLineOnscrollEnd';
import useMeals from '../apollo/queries/useMeals';
import useTotalItems from '../apollo/queries/useTotalItems';
import useScrollToUpdatedTimelinePosition from '../utils/useScrollToUpdatedTimelinePosition';

const ItemsTimeline = (): JSX.Element => {
  const { timelineStart, timelineEnd } = useTimelineContext();
  const [month, setMonth] = useState(
    timelineEnd.toLocaleString('default', { month: 'long' })
  );

  const days = useDaysRangeInMs();
  const timelineLengthInPx = (Times.DayInMs * days) / Times.MsPerPx;
  const timelineStartMark = useRef<HTMLDivElement | null>(null);
  const scrollableRef = useRef<HTMLDivElement | null>(null);

  const newRangeEnd = new Date(timelineStart.getTime() + Times.DayInMs * DAYS_TO_LOAD);
  const { feelsData, fetchMoreFeels } = useFeels(newRangeEnd, timelineStart);
  const { mealsData, fetchMoreMeals } = useMeals(newRangeEnd, timelineStart);
  const { data: totalItemsData } = useTotalItems();

  useIncreaseTimeLineOnscrollEnd(timelineStartMark);
  useFetchMoreOnUpdateTimeline(fetchMoreFeels, fetchMoreMeals, {
    lt: newRangeEnd,
    gt: timelineStart,
  });
  useScrollToUpdatedTimelinePosition(timelineLengthInPx, scrollableRef);

  const shouldLoadMoreItems = () => {
    if (totalItemsData && feelsData && mealsData) {
      const { totalFeels, totalMeals } = totalItemsData.totalItems;
      const feelsLoaded = feelsData.feels.length;
      const mealsLoaded = mealsData.meals.length;
      return feelsLoaded < totalFeels || mealsLoaded < totalMeals;
    }

    return true;
  };

  return (
    <div ref={scrollableRef} className="overflow-y-scroll w-screen mt-16 bg-slate-800">
      <div className="flex justify-center w-screen h-[85vh] mx-auto my-auto relative">
        <div className="fixed top-[3.7rem] h-8 px-2 text-xl bg-slate-800 z-50">
          {month}
        </div>

        {shouldLoadMoreItems() ? (
          <div ref={timelineStartMark} className="absolute top-[10vh]" />
        ) : (
          <p className="absolute top-0 w-screen py-4 border-y-2 text-xl bg-slate-700 z-50">
            This is as far as it goes...
          </p>
        )}

        <div
          className={`w-0.5 bg-gray-200 mx-auto`}
          style={{ height: `${timelineLengthInPx}px` }}
        />
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
