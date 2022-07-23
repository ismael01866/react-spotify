import { ReactNode, useEffect } from 'react';

import { Grid, GridItem } from '@chakra-ui/react';
import { Navbar, Player, Sidebar } from './components';

export interface LayoutProps {
  children: ReactNode;
}

export function Layout(props: LayoutProps) {
  const { children } = props;

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {};

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Grid
      templateAreas={`
        "sidebar navbar"
        "sidebar content"
        "player player"
      `}
      gridTemplateRows={'auto 1fr auto'}
      gridTemplateColumns={'auto 1fr'}
      height={'100vh'}
    >
      <GridItem area={'navbar'}>
        <Navbar />
      </GridItem>

      <GridItem area={'sidebar'} bg={'bg.900'}>
        <Sidebar />
      </GridItem>

      <GridItem area={'content'} overflow={'auto'}>
        {children}
      </GridItem>

      <GridItem area={'player'}>
        <Player />
      </GridItem>
    </Grid>
  );
}
