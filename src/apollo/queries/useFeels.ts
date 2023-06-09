import { gql, useQuery } from '@apollo/client';
import { Feel } from '../../types';

const useFeels = (end: Date, timelineStart: Date) => {
  const { data, loading, fetchMore } = useQuery<{
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

  return {
    feelsData: data,
    feelsLoading: loading,
    fetchMoreFeels: fetchMore,
  };
};

export default useFeels;
