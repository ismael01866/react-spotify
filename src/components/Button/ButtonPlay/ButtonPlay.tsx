import { ButtonProps, IconButton, Skeleton } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { forwardRef, useContext } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import {
  PlayerContext,
  selectDeviceID,
  selectPaused,
  selectTrack
} from 'src/features/player';
import { DEBOUNCE_WAIT } from 'src/lib/constants';
import { fetcher } from 'src/lib/fetch';
import { withQueryParams } from 'src/lib/utils';

export interface BaseButtonPlayProps extends ButtonProps {
  [other: string]: any;
}

export interface ButtonPlayPropsWithURI extends BaseButtonPlayProps {
  uri: string | undefined;
}

export interface ButtonPlayPropsWithContextURI
  extends BaseButtonPlayProps {
  context_uri: string | undefined;
}

export type ButtonPlayProps =
  | ButtonPlayPropsWithURI
  | ButtonPlayPropsWithContextURI;

export const ButtonPlay = forwardRef<
  HTMLButtonElement,
  ButtonPlayProps
>((props, ref) => {
  const { uri, context_uri, ...others } = props;

  const track = useSelector(selectTrack);
  const paused = useSelector(selectPaused);
  const deviceID = useSelector(selectDeviceID);

  const { player } = useContext(PlayerContext);

  let trackIsPlaying = false;
  let artistIsPlaying = false;

  if (track.uri) {
    trackIsPlaying = track.uri === uri;
  }

  if (track?.artists?.[0].uri) {
    artistIsPlaying = track.artists[0].uri === context_uri;
  }

  const icon =
    paused || (!artistIsPlaying && !trackIsPlaying) ? (
      <FaPlay />
    ) : (
      <FaPause />
    );

  const handleOnClick = debounce(async () => {
    if (artistIsPlaying || trackIsPlaying) return player?.togglePlay();

    const url = withQueryParams('/api/spotify/me/player/play', {
      device_id: deviceID
    });

    fetcher(url, {
      method: 'POST',
      body: JSON.stringify({ uris: uri && [uri], context_uri })
    });
  }, DEBOUNCE_WAIT);

  return (
    <Skeleton isLoaded={!!deviceID}>
      <IconButton
        ref={ref}
        aria-label={'play'}
        colorScheme={'spotify'}
        icon={icon}
        onClick={handleOnClick}
        {...others}
      />
    </Skeleton>
  );
});

ButtonPlay.displayName = 'ButtonPlay';
