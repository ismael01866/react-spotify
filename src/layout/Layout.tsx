import { Grid, GridItem } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  PlayerContext,
  selectPlaybackID,
  setDeviceID,
  setDuration,
  setPaused,
  setPlaybackID,
  setPosition,
  setTrack,
  setUser,
  UserContext
} from 'src/modules';
import { useMe } from 'src/utils/hooks/services';
import { buildSpotifyPlayer } from 'src/utils/spotify';
import { Player, Sidebar } from './components';

interface LayoutProps {
  children: ReactNode;
}

export function Layout(props: LayoutProps) {
  const { children } = props;

  const dispatch = useDispatch();

  const { user } = useMe();
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

  // Profile setup

  useEffect(() => {
    if (!user) return;

    dispatch(setUser(user));
  }, [user, dispatch]);

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
    (user && (
      <UserContext.Provider value={{ ...user }}>
        <PlayerContext.Provider value={{ player }}>
          <Grid
            templateAreas={`
            "sidebar content"
            "player player"`}
            gridTemplateRows={'1fr auto'}
            gridTemplateColumns={'auto 1fr'}
            height={'100vh'}
          >
            <GridItem area={'sidebar'} pos={'relative'} zIndex={1}>
              <Sidebar />
            </GridItem>

            <GridItem
              area={'content'}
              py={12}
              px={12}
              ref={contentEl}
              overflowX={'hidden'}
              overflowY={'auto'}
              zIndex={0}
              sx={{
                scrollbarWidth: 'thin'
              }}
            >
              {children}
            </GridItem>

            {playbackID && (
              <GridItem area={'player'}>
                <Player />
              </GridItem>
            )}
          </Grid>
        </PlayerContext.Provider>
      </UserContext.Provider>
    )) || <></>
  );
}
