// import { signOut, useSession } from 'next-auth/react';
import { HStack, Image } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export interface PlayerProps {}

export function Player(props: PlayerProps) {
  const { data: session }: any = useSession();

  useEffect(() => {
    appendScript();

    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = session?.access_token;
      const player = buildPlayer({ token });

      player.connect();
    };
  }, [session]);

  const appendScript = () => {
    const script = document.createElement('script');

    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);
  };

  const buildPlayer = ({ token }: { token: string }) => {
    const player = new window.Spotify.Player({
      name: 'Spotify Web Player',
      volume: 0.5,
      getOAuthToken: (cb: (token: string) => {}) => {
        cb(token);
      }
    });

    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);

      window.device_id = device_id;
    });

    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    player.addListener('player_state_changed', (state) => {
      if (!state) return;

      console.log(
        '!!!!!!!',
        state.context.metadata.current_item.group.uri
      );

      // setTrack(state.track_window.current_track);
      // setPaused(state.paused);

      // player.getCurrentState().then((state) => {
      // !state ? setActive(false) : setActive(true);
      // });
    });

    return player;
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
