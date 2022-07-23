import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { setDeviceID } from './playerSlice';

import {
  AspectRatio,
  Box,
  Heading,
  HStack,
  Image,
  Progress,
  Text
} from '@chakra-ui/react';

import { ITrack } from 'src/types/track';
import { IAlbum } from 'src/types/album';
import { IArtist } from 'src/types/artist';

export interface PlayerProps {}

export function Player(props: PlayerProps) {
  const dispatch = useDispatch();
  const { data: session, status }: any = useSession();

  const [track, setTrack] = useState<ITrack>({});
  const [album, setAlbum] = useState<IAlbum>({});
  const [artist, setArtist] = useState<IArtist>({});

  const [test, setTest] = useState(0);

  const [player, setPlayer] = useState<any>();
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

        // console.log(state);

        const track = state?.track_window?.current_track;
        const album = track?.album;
        const artist = track?.artists[0];

        setTrack(track);
        setAlbum(album);
        setArtist(artist);

        // const now = Date.now();

        // setInterval(() => {

        // const elapsed = test + 1;

        // console.log(elapsed);

        // return elapsed;

        // console.log(elapsed, durationInSeconds);

        // return (elapsed * 100) / durationInSeconds;
        // });
        // }, 1000);

        // const now = Date.now();

        // console.log(state.track_window.current_track);

        setPlaybackID(state.playback_id);
      });

      player.connect().then((success: boolean) => {
        if (success) setPlayer(player);
      });
    };
  }, [session, status, buildPlayer, dispatch]);

  useEffect(() => {
    if (!player) return;

    player.getCurrentState().then((state: any) => {
      if (!state) return;

      let counter = 0;
      const durationInSeconds = state.duration / 1000;

      setInterval(() => {
        setTest((counter++ * 100) / durationInSeconds);
      }, 1000);
    });
  }, [player, playbackID]);

  // console.log(test);

  return (
    (playbackID || true) && (
      <>
        <Progress colorScheme={'spotify'} size={'xs'} value={test} />

        <HStack bg={'bg.base'} h={'6xs'} spacing={8} w={'full'}>
          <AspectRatio h={'full'} ratio={4 / 3} w={'7xs'}>
            <Image
              maxHeight={'full'}
              src={album.images && album.images[0].url}
              alt={album.name}
            />
          </AspectRatio>

          <Box>
            <Text color={'text.base'} fontSize={'xs'}>
              {artist.name}
            </Text>
            <Heading fontSize={'sm'} mt={1}>
              {track.name}
            </Heading>

            <Text color={'text.muted'} fontSize={'xs'} mt={3}>
              {album.name}
            </Text>
          </Box>
        </HStack>
      </>
    )
  );
}
