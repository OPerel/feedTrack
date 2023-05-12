import { useEffect, useRef } from 'react';
import { ApolloQueryResult, FetchMoreQueryOptions } from '@apollo/client';

type FetchMore = <TFetchData, TFetchVars>(
  fetchMoreOptions: FetchMoreQueryOptions<TFetchVars, TFetchData>
) => Promise<ApolloQueryResult<TFetchData>>;

type UseFetchMoreOnUpdate = (
  fetchMoreMeals: FetchMore,
  fetchMoreFeels: FetchMore,
  variables: { gt: Date; lt: Date }
) => void;

const useFetchMoreOnUpdate: UseFetchMoreOnUpdate = (
  fetchMoreMeals,
  fetchMoreFeels,
  variables
) => {
  const isMounting = useRef(true);
  const { lt, gt } = variables;

  useEffect(() => {
    if (!isMounting) {
      fetchMoreMeals({ variables: { gt, lt } });
      fetchMoreFeels({ variables: { gt, lt } });
    }
    isMounting.current = false;
  }, [fetchMoreFeels, fetchMoreMeals, gt, lt]);
};

export default useFetchMoreOnUpdate;
