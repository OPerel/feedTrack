import { gql, useQuery } from '@apollo/client';
import { Meal } from '../../types';

const useMeals = () => {
  return useQuery<{
    meals: Meal[];
  }>(
    gql(`
    query GetMeals {
      meals {
        ingredients
        eaten_at
      }
    }
  `)
  );
};

export default useMeals;
