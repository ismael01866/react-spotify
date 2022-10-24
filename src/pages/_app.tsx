import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from 'layout';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';

import { theme } from '../../theme';

import { store } from './../store';

import 'styles/globals.css';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
            <NextNProgress color="var(--chakra-colors-spotify-500)" />
          </Layout>
        </Provider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default App;
