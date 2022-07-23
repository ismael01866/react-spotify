import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import { useDispatch } from 'react-redux';
import { setDeviceID } from './playerSlice';

import { AspectRatio, HStack, Image } from '@chakra-ui/react';

import { IAlbum } from 'src/types/album';

export interface PlayerProps {}

export function Player(props: PlayerProps) {
  const dispatch = useDispatch();
  const { data: session, status }: any = useSession();

  const [album, setAlbum] = useState<IAlbum>({});
  const [playbackID, setPlaybackID] = useState();

  const buildPlayer = useCallback((token: string) => {
    return new window.Spotify.Player({
      name: 'Spotify Web Player',
      volume: 0.5,
      getOAuthToken: (cb: (token: string) => {}) => {
        cb(token);
      }
    });
  }, []);

  useEffect(() => {
    // console.log('SESSION', session);

    if (status !== 'authenticated') return;

    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = session?.access_token;
      const player = buildPlayer(token);

      player.addListener(
        'ready',
        ({ device_id }: { device_id: string }) => {
          dispatch(setDeviceID(device_id));
        }
      );

      player.addListener('player_state_changed', (state: any) => {
        if (!state) return;

        const album = state?.track_window?.current_track?.album;
        setAlbum(album);

        setPlaybackID(state.playback_id);
      });

      player.connect();
    };
  }, [session, status, buildPlayer, dispatch]);

  const { name, images = [] } = album;

  return (
    playbackID && (
      <HStack
        bg={'bg.base'}
        borderTop={'1px solid'}
        borderColor={'bg.800'}
        h={'7xs'}
        w={'full'}
      >
        <AspectRatio h={'full'} ratio={4 / 3} w={'7xs'}>
          <Image maxHeight={'full'} src={images[0]?.url} alt={name} />
        </AspectRatio>
      </HStack>
    )
  );
}
