import { HStack, IconButton } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { useContext } from 'react';
import { FaStepBackward, FaStepForward } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { PlayerContext, selectPaused } from 'src/features/player';
import { DEBOUNCE_WAIT } from 'src/lib/constants';
import { ButtonPlay } from './components';

export function PlayControls() {
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
