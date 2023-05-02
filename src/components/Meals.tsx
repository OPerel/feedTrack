import React from 'react';
import useMeals from '../apollo/queries/useMeals';

interface MealsProps {}

const Meals = (): JSX.Element => {
  const { loading, error, data } = useMeals();
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <>
      {data.meals.map(({ ingredients, eaten_at }) => {
        return (
          <div>
            <span>{new Date(eaten_at).toLocaleString()}</span>
            &nbsp; - &nbsp;
            <span>{JSON.stringify(ingredients)}</span>
          </div>
        );
      })}
    </>
  );
};

export default Meals;
