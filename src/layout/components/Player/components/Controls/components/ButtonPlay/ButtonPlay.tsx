import { debounce } from 'lodash';

import { IconButton } from '@chakra-ui/react';
import { FaPause, FaPlay } from 'react-icons/fa';

import { ON_CLICK_WAIT } from 'src/lib/constants';

export interface ButtonPlayProps {
  paused: boolean;
  player: any;
}

export function ButtonPlay(props: ButtonPlayProps) {
  const { paused, player } = props;

  const handleOnClick = debounce(() => {
    player?.togglePlay();
  }, ON_CLICK_WAIT);

  return (
    <>
      <IconButton
        aria-label={'play'}
        icon={paused ? <FaPlay /> : <FaPause />}
        size={'lg'}
        onClick={handleOnClick}
      />
    </>
  );
}
