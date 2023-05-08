import { PropsWithChildren } from 'react';
import { ConfigProvider, theme } from 'antd';

const ThemeProvider = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#F0F8FF',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
