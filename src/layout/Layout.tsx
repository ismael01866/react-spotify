import { useSession } from 'next-auth/react';
import { ReactNode, useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { PlayerContext } from 'src/features/player/PlayerContext';

import {
  selectPlaybackID,
  setDeviceID,
  setDuration,
  setPaused,
  setPlaybackID,
  setPosition,
  setTrack
} from 'src/features/player/PlayerSlice';

import { Grid, GridItem } from '@chakra-ui/react';
import { Navbar, Player, Sidebar } from './components';

import { buildSpotifyPlayer } from 'src/lib/spotify';

export interface LayoutProps {
  children: ReactNode;
}

export function Layout(props: LayoutProps) {
  const { children } = props;

  const dispatch = useDispatch();
  const { data: session, status }: any = useSession();

  const playbackID = useSelector(selectPlaybackID);

  const [player, setPlayer] = useState(null);

  const contentEl = useRef<HTMLDivElement>(null);

  // Script embed

  useEffect(() => {
    if (status !== 'authenticated') return;

    const script = document.createElement('script');

    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [status]);

  // Player setup

  useEffect(() => {
    if (status !== 'authenticated') return;

    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = session?.access_token;
      const player = buildSpotifyPlayer(token, {
        onReady: (device_id) => {
          dispatch(setDeviceID(device_id));
        },
        onStateChange: (state) => {
          dispatch(setPlaybackID(state?.playback_id));

          dispatch(setPaused(state?.paused));
          dispatch(setDuration(state?.duration));
          dispatch(setPosition(state?.position));

          dispatch(setTrack(state?.track_window?.current_track));
        }
      });

      player.connect().then((success: boolean) => {
        if (success) setPlayer(player);
      });
    };
  }, [session, status, dispatch]);

  // Scroll to top

  useEffect(() => {
    contentEl?.current?.scrollTo({ top: 0 });
  }, [children]);

  // Render

  if (status === 'loading') {
    return <>loading...</>;
  }

  if (status !== 'authenticated') {
    return <>{children}</>;
  }

  return (
    <PlayerContext.Provider value={{ player }}>
      <Grid
        templateAreas={`"sidebar navbar"
                          "sidebar content"
                          "player player"`}
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

        <GridItem area={'content'} overflow={'auto'} ref={contentEl}>
          {children}
        </GridItem>

        {playbackID && (
          <GridItem area={'player'}>
            <Player />
          </GridItem>
        )}
      </Grid>
    </PlayerContext.Provider>
  );
}
