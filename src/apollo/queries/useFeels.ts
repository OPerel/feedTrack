import { gql, useQuery } from '@apollo/client';
import { Feel } from '../../types';

const useFeels = (end: number, timelineStart: number) => {
  return useQuery<{
    feels: Feel[];
  }>(
    gql(`
    query GetFeels($gt: Date!, $lt: Date!) {
      feels(lt: $lt, gt: $gt) {
        score
        felt_at
      }
    }
  `),
    {
      variables: { lt: end, gt: timelineStart },
    }
  );
};

export default useFeels;
