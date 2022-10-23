import { SimpleGrid, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectTrack } from 'src/modules/player/Player/PlayerSlice';
import {
  PlayControls,
  TrackMeta,
  TrackProgress,
  VolumeBar
} from './components';

export function Player() {
  const track = useSelector(selectTrack);

  return (
    (track.uri && (
      <SimpleGrid h={'6xs'} w={'full'} columns={3} spacing={8}>
        {track && <TrackMeta track={track} />}

        <VStack alignSelf={'center'} mt={2} spacing={0}>
          <PlayControls />
          <TrackProgress />
        </VStack>

        <VolumeBar />
      </SimpleGrid>
    )) || <></>
  );
}
