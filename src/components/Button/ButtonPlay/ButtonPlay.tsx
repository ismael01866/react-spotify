import { ButtonProps, forwardRef, IconButton } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { useContext } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Skeleton } from 'src/components/Skeleton';
import { PlayerContext } from 'src/modules/player/Player/PlayerContext';
import {
  selectDeviceID,
  selectPaused,
  selectPlaybackContext,
  selectTrack
} from 'src/modules/player/Player/PlayerSlice';
import { DEBOUNCE_WAIT } from 'src/utils/constants';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';

interface BaseButtonPlayProps extends ButtonProps {
  [other: string]: any;
}

interface ButtonPlayPropsWithURI extends BaseButtonPlayProps {
  uri?: string;
}

interface ButtonPlayPropsWithContextURI extends BaseButtonPlayProps {
  context_uri?: string;
}

type ButtonPlayProps =
  | ButtonPlayPropsWithURI
  | ButtonPlayPropsWithContextURI;

export const ButtonPlay = forwardRef<ButtonPlayProps, 'button'>(
  (props, ref) => {
    const { uri, context_uri, ...others } = props;

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
  }
);

ButtonPlay.displayName = 'ButtonPlay';
