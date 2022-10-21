import {
  ButtonProps,
  forwardRef,
  IconButton,
  InteractivityProps
} from '@chakra-ui/react';
import { debounce } from 'lodash';
import { useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import {
  selectDeviceID,
  selectPaused,
  selectPlaybackContext,
  selectPlayer,
  selectTrack
} from 'src/modules/player/Player/PlayerSlice';
import { DEBOUNCE_WAIT } from 'src/utils/constants';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import { useSpotifyApi } from 'src/utils/hooks/api';

interface BaseButtonPlayProps extends ButtonProps {
  uri: string;
  context_uri: string;
  [other: string]: any;
}

export const ButtonPlay = forwardRef<
  Partial<BaseButtonPlayProps>,
  'button'
>((props, ref) => {
  const { uri, context_uri, ...others } = props;

  const player = useSelector(selectPlayer);
  const deviceID = useSelector(selectDeviceID);

  const track = useSelector(selectTrack);
  const paused = useSelector(selectPaused);
  const playbackContext = useSelector(selectPlaybackContext);

  const [loading, setLoading] = useState(false);

  let trackIsPlaying = false;

  if (track?.uri) {
    trackIsPlaying = track.uri === uri;
  }

  const isPlaying =
    playbackContext.uri === context_uri || trackIsPlaying;

  const { headers, url: baseURL } = useSpotifyApi(`/me/player/play`);

  const handleOnClick = debounce(async () => {
    if (isPlaying) return player?.togglePlay();

    handleFetch();
  }, DEBOUNCE_WAIT);

  const handleFetch = () => {
    setLoading(true);

    const url = utilWithQueryParams(baseURL, { device_id: deviceID });
    const body = JSON.stringify({ uris: uri && [uri], context_uri });

    fetcher(url, { method: 'PUT', body, ...headers }).finally(() => {
      setLoading(false);
    });
  };

  const icon = paused || !isPlaying ? <FaPlay /> : <FaPause />;
  const isLoading = loading || !deviceID;

  const sharedProps = {
    ref: ref,
    boxShadow: 'dark-lg',
    colorScheme: 'spotify',
    disabled: false,
    pointerEvents: (isLoading
      ? 'none'
      : 'auto') as keyof InteractivityProps['pointerEvents'],
    isLoading,
    onClick: handleOnClick,
    ...others
  };

  return (
    <IconButton aria-label={'play'} icon={icon} {...sharedProps} />
  );
});

ButtonPlay.displayName = 'ButtonPlay';
