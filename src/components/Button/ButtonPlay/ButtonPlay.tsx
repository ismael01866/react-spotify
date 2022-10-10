import { ButtonProps, IconButton } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { forwardRef, useContext } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Skeleton } from 'src/components/Skeleton';
import { PlayerContext } from 'src/modules/player/Player/PlayerContext';
import {
  selectDeviceID,
  selectPaused,
  selectTrack
} from 'src/modules/player/Player/PlayerSlice';
import { DEBOUNCE_WAIT } from 'src/utils/constants';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';

interface BaseButtonPlayProps extends ButtonProps {
  [other: string]: any;
}

interface ButtonPlayPropsWithURI extends BaseButtonPlayProps {
  uri: string | undefined;
}

interface ButtonPlayPropsWithContextURI extends BaseButtonPlayProps {
  context_uri: string | undefined;
}

type ButtonPlayProps =
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
  let albumIsPlaying = false;
  let artistIsPlaying = false;

  if (track?.uri) {
    trackIsPlaying = track.uri === uri;
  }

  if (track?.album?.uri) {
    albumIsPlaying = track.album.uri === context_uri;
  }

  if (track?.artists?.[0].uri) {
    artistIsPlaying = track.artists[0].uri === context_uri;
  }

  const isPlaying =
    !artistIsPlaying && !albumIsPlaying && !trackIsPlaying;

  const icon = paused || isPlaying ? <FaPlay /> : <FaPause />;

  const handleOnClick = debounce(async () => {
    if (artistIsPlaying || trackIsPlaying) return player?.togglePlay();

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
});

ButtonPlay.displayName = 'ButtonPlay';
