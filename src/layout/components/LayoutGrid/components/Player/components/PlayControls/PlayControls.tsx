import { FaStepBackward, FaStepForward } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { HStack, IconButton } from '@chakra-ui/react';
import { debounce } from 'lodash';

import { selectPlayerState } from 'modules/player/Player/PlayerSlice';
import { DEBOUNCE_WAIT } from 'utils/constants';

import { PlayerButtonPlay } from './components';

export function PlayControls() {
  const { player, paused } = useSelector(selectPlayerState);

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
      <PlayerButtonPlay paused={paused} player={player} />
      <IconButton
        aria-label={'stepbackward'}
        icon={<FaStepForward />}
        variant={'ghost'}
        onClick={handleOnClickNextTrack}
      />
    </HStack>
  );
}
