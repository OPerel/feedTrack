import { ApolloClient, InMemoryCache } from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first',
    },
  },
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          feels: concatPagination(),
          meals: concatPagination(),
        },
      },
    },
  }),
});

export default client;
