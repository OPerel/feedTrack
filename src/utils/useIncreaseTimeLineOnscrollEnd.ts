import { MutableRefObject, useEffect } from 'react';
import { useTimelineContext } from '../contextProviders/TimelineProvider';

const useIncreaseTimeLineOnscrollEnd = (
  timelineStartMark: MutableRefObject<HTMLDivElement | null>
) => {
  const { setWeeks } = useTimelineContext();
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log('loading more days');
        setWeeks((prev) => prev + 1);
      }
    });

    if (timelineStartMark.current) {
      observer.observe(timelineStartMark.current as Element);
    }

    return () => {
      observer.disconnect();
    };
  }, [setWeeks, timelineStartMark]);
};

export default useIncreaseTimeLineOnscrollEnd;
