import { useLayoutEffect } from 'react';
import { useTimelineContext } from '../contextProviders/TimelineProvider';

const useScrollToUpdatedTimelinePosition = (
  timelineLengthInPx: number,
  scrollableRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  const { weeks } = useTimelineContext();
  useLayoutEffect(() => {
    if (scrollableRef.current !== null) {
      scrollableRef.current.scrollTop += timelineLengthInPx / weeks;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timelineLengthInPx]);
};

export default useScrollToUpdatedTimelinePosition;
