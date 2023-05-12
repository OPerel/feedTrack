import { useRef } from 'react';
import useTotalItems from '../apollo/queries/useTotalItems';
import { Feel, Meal } from '../types';
import useIncreaseTimeLineOnscrollEnd from '../utils/useIncreaseTimeLineOnscrollEnd';
import { Labels } from '../constants';

interface TimelineLoaderProps {
  feels: Feel[] | undefined;
  meals: Meal[] | undefined;
}

const TimelineLoader = ({ feels, meals }: TimelineLoaderProps): JSX.Element => {
  const { data: totalItemsData } = useTotalItems();
  const timelineStartMark = useRef<HTMLDivElement | null>(null);
  useIncreaseTimeLineOnscrollEnd(timelineStartMark);

  const shouldLoadMoreItems = () => {
    if (totalItemsData && feels && meals) {
      const { totalFeels, totalMeals } = totalItemsData.totalItems;
      const feelsLoaded = feels.length;
      const mealsLoaded = meals.length;
      return feelsLoaded < totalFeels || mealsLoaded < totalMeals;
    }

    return true;
  };

  if (shouldLoadMoreItems()) {
    return <div ref={timelineStartMark} className="absolute top-[10vh]" />;
  }

  return (
    <p className="absolute top-0 w-screen py-4 border-y-2 text-xl bg-slate-700 z-50">
      {Labels.TimelineEnd}
    </p>
  );
};

export default TimelineLoader;
