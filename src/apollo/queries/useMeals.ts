import { gql, useQuery } from '@apollo/client';
import { Meal } from '../../types';

const useMeals = (end: Date, timelineStart: Date) => {
  const { data, fetchMore } = useQuery<{
    meals: Meal[];
  }>(
    gql(`
    query GetMeals($gt: DateTime!, $lt: DateTime!) {
      meals(lt: $lt, gt: $gt) {
        id
        ingredients
        createdAt
      }
    }
  `),
    {
      variables: { lt: end.toISOString(), gt: timelineStart.toISOString() },
    }
  );

  return {
    mealsData: data,
    fetchMoreMeals: fetchMore,
  };
};

export default useMeals;
