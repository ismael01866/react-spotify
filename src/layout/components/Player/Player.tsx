import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { HStack, Image } from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { setDeviceID } from './playerSlice';

export interface PlayerProps {}

export function Player(props: PlayerProps) {
  const { data: session, status }: any = useSession();

  const dispatch = useDispatch();
  // const [player, setPlayer] = useState();

  useEffect(() => {
    console.log('SESSION', session);
    if (status !== 'authenticated') return;

    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = session?.access_token;
      const player = buildPlayer(token);

      player.connect();
    };
  }, [session, status]);

  // useEffect(() => {
  // dispatch(setDeviceID());
  // }, [deviceID, dispatch]);

  const buildPlayer = (token: string) => {
    const windowPlayer = new window.Spotify.Player({
      name: 'Spotify Web Player',
      volume: 0.5,
      getOAuthToken: (cb: (token: string) => {}) => {
        cb(token);
      }
    });

    windowPlayer.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);

      dispatch(setDeviceID(device_id));
    });

    windowPlayer.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    windowPlayer.addListener('player_state_changed', (state) => {
      console.log(state);

      if (!state) return;

      // console.log(state.context.metadata.current_item.group.uri);

      // setTrack(state.track_window.current_track);
      // setPaused(state.paused);

      // player.getCurrentState().then((state) => {
      // !state ? setActive(false) : setActive(true);
      // });
    });

    windowPlayer.addListener('initialization_error', ({ message }) => {
      console.error(message);
    });

    windowPlayer.addListener('authentication_error', ({ message }) => {
      console.error(message);
    });

    windowPlayer.addListener('account_error', ({ message }) => {
      console.error(message);
    });

    return windowPlayer;
  };

  return (
    <HStack
      bg={'bg.base'}
      borderTop={'1px solid'}
      borderColor={'bg.800'}
      h={'7xs'}
      w={'full'}
    >
      <Image src={''} alt={''} />
    </HStack>
  );
}
