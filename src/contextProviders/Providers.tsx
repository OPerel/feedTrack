import { PropsWithChildren } from 'react';
import TimelineProvider from './TimelineProvider';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo/client';
import ThemeProvider from './ThemeProvider';

const Providers = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <TimelineProvider>{children}</TimelineProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default Providers;
