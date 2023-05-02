import { gql, useQuery } from '@apollo/client';
import { Feel } from '../../types';

const useFeels = () => {
  return useQuery<{
    feels: Feel[];
  }>(
    gql(`
    query GetFeels {
      feels {
        score
        felt_at
      }
    }
  `)
  );
};

export default useFeels;
