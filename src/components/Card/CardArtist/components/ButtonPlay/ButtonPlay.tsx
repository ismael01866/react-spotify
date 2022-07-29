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

import { ON_CLICK_WAIT } from 'src/lib/constants';

export interface ButtonPlayProps {
  uri?: string;
}

export function ButtonPlay(props: ButtonPlayProps) {
  const { uri } = props;

  const track = useSelector(selectTrack);
  const paused = useSelector(selectPaused);
  const deviceID = useSelector(selectDeviceID);

  const { player } = useContext(PlayerContext);

  const artistIsPlaying =
    track?.artists && track?.artists[0].uri === uri;

  const icon = paused || !artistIsPlaying ? <FaPlay /> : <FaPause />;

  const handleOnClick = debounce(async () => {
    if (artistIsPlaying) return player?.togglePlay();

    fetch('api/spotify/me/player/play', {
      method: 'POST',
      body: JSON.stringify({ device_id: deviceID, context_uri: uri })
    });
  }, ON_CLICK_WAIT);

  return (
    deviceID && (
      <IconButton
        aria-label={'play'}
        colorScheme={'spotify'}
        icon={icon}
        opacity={0}
        _groupHover={{ opacity: 1 }}
        onClick={handleOnClick}
      />
    )
  );
}
