import useMeals from '../apollo/queries/useMeals';
import { useTimelineContext } from '../contextProviders/TimelineProvider';
import { DAYS_TO_LOAD, Times } from '../constants';
import useFetchMoreOnUpdate from '../utils/useFetchMoreOnUpdate';
import Meal from './Meal';

const Meals = () => {
  const { timelineStart } = useTimelineContext();
  const end = new Date(timelineStart.getTime() + Times.DayInMs * DAYS_TO_LOAD);
  const { error, data, fetchMore } = useMeals(end, timelineStart);

  useFetchMoreOnUpdate(fetchMore, { lt: end, gt: timelineStart });

  if (error) {
    return <p style={{ color: 'red' }}>Error: {JSON.stringify(error)}</p>;
  }

  if (!data) return null;

  return (
    <>
      {data.meals.map((meal) => {
        return <Meal key={meal.id} meal={meal} />;
      })}
    </>
  );
};

export default Meals;
