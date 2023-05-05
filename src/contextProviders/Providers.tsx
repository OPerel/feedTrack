import React, { PropsWithChildren } from 'react';
import TimelineProvider from './TimelineProvider';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo/client';

const Providers = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <TimelineProvider>{children}</TimelineProvider>
    </ApolloProvider>
  );
};

export default Providers;
