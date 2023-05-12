import { gql, useQuery } from '@apollo/client';
import { TotalItems } from '../../types';

const useTotalItems = () => {
  return useQuery<{ totalItems: TotalItems }>(
    gql(`
      query Totals {
        totalItems {
          totalFeels
          totalMeals
        }
      }`)
  );
};

export default useTotalItems;
