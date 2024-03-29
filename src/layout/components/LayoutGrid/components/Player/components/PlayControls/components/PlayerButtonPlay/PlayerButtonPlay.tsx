import { FaPause, FaPlay } from 'react-icons/fa';
import { IconButton } from '@chakra-ui/react';
import { debounce } from 'lodash';

import { DEBOUNCE_WAIT } from 'utils/constants';

interface PlayerButtonPlayProps {
  paused: boolean;
  player: any;
}

export function PlayerButtonPlay(props: PlayerButtonPlayProps) {
  const { paused, player } = props;
  const handleOnClick = debounce(() => {
    player?.togglePlay();
  }, DEBOUNCE_WAIT);

  return (
    <>
      <IconButton
        aria-label={'play'}
        icon={paused ? <FaPlay /> : <FaPause />}
        onClick={handleOnClick}
      />
    </>
  );
}
