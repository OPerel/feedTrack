import { useEffect, useRef } from 'react';
import { ApolloQueryResult, FetchMoreQueryOptions } from '@apollo/client';

type UseFetchMoreOnUpdate = (
  fetchMore: <TFetchData, TFetchVars>(
    fetchMoreOptions: FetchMoreQueryOptions<TFetchVars, TFetchData>
  ) => Promise<ApolloQueryResult<TFetchData>>,
  variables: { gt: Date; lt: Date }
) => void;

const useFetchMoreOnUpdate: UseFetchMoreOnUpdate = (fetchMore, variables) => {
  const isMounting = useRef(true);
  const { lt, gt } = variables;

  useEffect(() => {
    if (!isMounting) {
      fetchMore({ variables: { gt, lt } });
    }
    isMounting.current = false;
  }, [fetchMore, gt, lt]);
};

export default useFetchMoreOnUpdate;
