import 'styles/globals.css';

import { theme } from '../../theme';
import { store } from './../store';

import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';

import type { AppProps } from 'next/app';

function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default App;
