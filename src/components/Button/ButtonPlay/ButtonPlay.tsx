import {
  Button,
  ButtonProps,
  forwardRef,
  IconButton
} from '@chakra-ui/react';
import { debounce } from 'lodash';
import { useContext } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Skeleton } from 'src/components/Skeleton';
import {
  selectDeviceID,
  selectPaused,
  selectPlaybackContext,
  selectTrack
} from 'src/modules/player/Player/PlayerSlice';
import { PlayerContext } from 'src/state';
import { DEBOUNCE_WAIT } from 'src/utils/constants';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';

interface BaseButtonPlayProps extends ButtonProps {
  uri: string;
  context_uri: string;
  [other: string]: any;
}

export const ButtonPlay = forwardRef<
  Partial<BaseButtonPlayProps>,
  'button'
>((props, ref) => {
  const { children, uri, context_uri, ...others } = props;

  const track = useSelector(selectTrack);
  const paused = useSelector(selectPaused);
  const deviceID = useSelector(selectDeviceID);
  const playbackContext = useSelector(selectPlaybackContext);

  const { player } = useContext(PlayerContext);

  let trackIsPlaying = false;

  if (track?.uri) {
    trackIsPlaying = track.uri === uri;
  }

  const isPlaying =
    playbackContext.uri === context_uri || trackIsPlaying;

  const icon = paused || !isPlaying ? <FaPlay /> : <FaPause />;

  const handleOnClick = debounce(async () => {
    if (isPlaying) return player?.togglePlay();

    const url = utilWithQueryParams('/api/spotify/me/player/play', {
      device_id: deviceID
    });

    fetcher(url, {
      method: 'POST',
      body: JSON.stringify({ uris: uri && [uri], context_uri })
    });
  }, DEBOUNCE_WAIT);

  const sharedProps = {
    ref: ref,
    boxShadow: 'dark-lg',
    colorScheme: 'spotify',
    ...others
  };

  return (
    <Skeleton
      isLoaded={!!deviceID}
      startColor={'whiteAlpha.200'}
      endColor={'whiteAlpha.500'}
    >
      {children ? (
        <Button
          leftIcon={icon}
          onClick={handleOnClick}
          {...sharedProps}
        >
          {children}
        </Button>
      ) : (
        <IconButton
          aria-label={'play'}
          icon={icon}
          onClick={handleOnClick}
          {...sharedProps}
        />
      )}
    </Skeleton>
  );
});

ButtonPlay.displayName = 'ButtonPlay';
