import { debounce } from 'lodash';

import { useContext } from 'react';
import { PlayerContext, selectPaused } from 'src/features';

import { useSelector } from 'react-redux';

import { HStack, IconButton } from '@chakra-ui/react';
import { FaStepBackward, FaStepForward } from 'react-icons/fa';

import { ButtonPlay } from './components';

import { DEBOUNCE_WAIT } from 'src/lib/constants';

export interface PlayControlsProps {}

export function PlayControls(props: PlayControlsProps) {
  const paused = useSelector(selectPaused);

  const { player } = useContext(PlayerContext);

  const handleOnClickPrevTrack = debounce(() => {
    player?.previousTrack();
  }, DEBOUNCE_WAIT);

  const handleOnClickNextTrack = debounce(() => {
    player?.nextTrack();
  }, DEBOUNCE_WAIT);

  return (
    <HStack spacing={2}>
      <IconButton
        aria-label={'stepbackward'}
        icon={<FaStepBackward />}
        variant={'ghost'}
        onClick={handleOnClickPrevTrack}
      />
      <ButtonPlay paused={paused} player={player} />
      <IconButton
        aria-label={'stepbackward'}
        icon={<FaStepForward />}
        variant={'ghost'}
        onClick={handleOnClickNextTrack}
      />
    </HStack>
  );
}
