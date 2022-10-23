import { ButtonProps, forwardRef, IconButton } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { DEBOUNCE_WAIT } from 'src/utils/constants';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import { useSpotifyApi } from 'src/utils/hooks/api';
import { usePlayerState } from './hooks';

interface BaseButtonPlayProps extends ButtonProps {
  uri: string;
  context_uri: string;
  [other: string]: any;
}

export const ButtonPlay = forwardRef<Partial<BaseButtonPlayProps>, 'button'>(
  (props, ref) => {
    const { uri, context_uri, ...others } = props;

    const { player, deviceID, paused, trackIsPlaying } = usePlayerState({
      uri,
      context_uri
    });

    const [loading, setLoading] = useState(false);
    const { headers, url: baseURL } = useSpotifyApi(`/me/player/play`);

    const handleOnClick = debounce(async () => {
      if (trackIsPlaying) return player?.togglePlay();

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

    const icon = paused || !trackIsPlaying ? <FaPlay /> : <FaPause />;
    const isLoading = loading || !deviceID;

    return (
      <IconButton
        aria-label={'play'}
        icon={icon}
        ref={ref}
        boxShadow={'dark-lg'}
        colorScheme={'spotify'}
        disabled={false}
        pointerEvents={isLoading ? 'none' : 'auto'}
        isLoading={isLoading}
        onClick={handleOnClick}
        {...others}
      />
    );
  }
);

ButtonPlay.displayName = 'ButtonPlay';
