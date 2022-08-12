import 'styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Layout } from 'src/layout';
import { theme } from '../../theme';
import { store } from './../store';

function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default App;
