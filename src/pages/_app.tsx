import 'styles/globals.css';
import { theme } from '../../theme';

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
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default App;
