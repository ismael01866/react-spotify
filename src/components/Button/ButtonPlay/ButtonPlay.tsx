import { debounce } from 'lodash';
import { useContext } from 'react';

import {
  PlayerContext,
  selectDeviceID,
  selectPaused,
  selectTrack
} from 'src/features';

import { useSelector } from 'react-redux';

import { IconButton } from '@chakra-ui/react';
import { FaPause, FaPlay } from 'react-icons/fa';

import { DEBOUNCE_WAIT } from 'src/lib/constants';

export interface ButtonPlayProps {
  uri?: string;
  context_uri?: string;
  variant?: 'compact' | 'full';
  [other: string]: any;
}

export function ButtonPlay(props: ButtonPlayProps) {
  const { uri, context_uri, variant, ...others } = props;

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

    const device_id = deviceID;
    const uris = uri && [uri];

    fetch('/api/spotify/me/player/play', {
      method: 'POST',
      body: JSON.stringify({ device_id, uris, context_uri })
    });
  }, DEBOUNCE_WAIT);

  return (
    (deviceID && (
      <IconButton
        aria-label={'play'}
        colorScheme={'spotify'}
        icon={icon}
        onClick={handleOnClick}
        {...others}
      />
    )) || <></>
  );
}
