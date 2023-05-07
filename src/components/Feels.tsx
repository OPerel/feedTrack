import useFeels from '../apollo/queries/useFeels';
import Feel from './Feel';

import { useTimelineContext } from '../contextProviders/TimelineProvider';
import { DAYS_TO_LOAD, Times } from '../constants';
import useFetchMoreOnUpdate from '../utils/useFetchMoreOnUpdate';

const Feels = (): JSX.Element | null => {
  const { timelineStart } = useTimelineContext();
  const end = new Date(timelineStart.getTime() + Times.DayInMs * DAYS_TO_LOAD);
  const { error, data, fetchMore } = useFeels(end, timelineStart);

  useFetchMoreOnUpdate(fetchMore, { lt: end, gt: timelineStart });

  if (error) {
    return <p style={{ color: 'red' }}>Error: {JSON.stringify(error)}</p>;
  }

  if (!data) return null;

  return (
    <>
      {data.feels.map((feel: Feel) => {
        return <Feel key={feel.id} feel={feel} />;
      })}
    </>
  );
};

export default Feels;
