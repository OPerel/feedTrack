import { gql, useQuery } from '@apollo/client';
import { Feel } from '../../types';

const useFeels = (end: Date, timelineStart: Date) => {
  return useQuery<{
    feels: Feel[];
  }>(
    gql(`
    query GetFeels($gt: DateTime!, $lt: DateTime!) {
      feels(lt: $lt, gt: $gt) {
        id
        score
        createdAt
      }
    }
  `),
    {
      variables: { lt: end.toISOString(), gt: timelineStart.toISOString() },
    }
  );
};

export default useFeels;
