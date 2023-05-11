import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { DAYS_TO_LOAD, Times } from '../constants';
import Feels from './Feels';
import { useTimelineContext } from '../contextProviders/TimelineProvider';
import useDaysRangeInMs from '../utils/useDaysRangeInMs';
import Days from './Days';
import Months from './Months';
import Meals from './Meals';
import FeelingPlot from './FeelingPlot';
import useFeels from '../apollo/queries/useFeels';
import useFetchMoreOnUpdate from '../utils/useFetchMoreOnUpdate';

const ItemsTimeline = (): JSX.Element => {
  const { timelineStart, timelineEnd, setWeek, week } = useTimelineContext();
  const [month, setMonth] = useState(
    timelineEnd.toLocaleString('default', { month: 'long' })
  );

  const days = useDaysRangeInMs();
  const lengthToDisplay = (Times.DayInMs * days) / Times.MsPerPx;
  const timelineStartMark = useRef<HTMLDivElement | null>(null);
  const scrollableRef = useRef<HTMLDivElement | null>(null);

  const end = new Date(timelineStart.getTime() + Times.DayInMs * DAYS_TO_LOAD);
  const { data, fetchMore } = useFeels(end, timelineStart);

  useFetchMoreOnUpdate(fetchMore, { lt: end, gt: timelineStart });

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log('loading more days');
        setWeek((prev) => prev + 1);
      }
    });

    if (timelineStartMark.current) {
      observer.observe(timelineStartMark.current as Element);
    }

    return () => {
      observer.disconnect();
    };
  }, [setWeek]);

  useLayoutEffect(() => {
    if (scrollableRef.current !== null) {
      scrollableRef.current.scrollTop += lengthToDisplay / week;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lengthToDisplay]);

  return (
    <div ref={scrollableRef} className="overflow-y-scroll w-screen mt-16 bg-slate-800">
      <div className="flex justify-center w-screen h-[85vh] mx-auto my-auto relative">
        <div className="fixed top-12 h-8 px-4 text-lg bg-slate-800">{month}</div>

        <div ref={timelineStartMark} className="absolute top-[10vh]" />

        <div
          className={`w-0.5 bg-gray-200 mx-auto`}
          style={{ height: `${lengthToDisplay}px` }}
        />
        <Days />
        <Months setMonth={setMonth} />
        <Feels data={data} />
        <Meals />
        {data?.feels && (
          <FeelingPlot feels={data.feels} lengthToDisplay={lengthToDisplay} />
        )}
      </div>
    </div>
  );
};

export default ItemsTimeline;
