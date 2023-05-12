import Meal from './Meal';
import { Meal as MealType } from '../types';

interface MealsProps {
  data: { meals: MealType[] } | undefined;
}

const Meals = ({ data }: MealsProps) => {
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
