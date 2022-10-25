import { useSelector } from 'react-redux';
import { SimpleGrid, VStack } from '@chakra-ui/react';

import { selectTrack } from 'modules/player/Player/PlayerSlice';

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
      <SimpleGrid h={'6xs'} w={'full'} columns={3} gap={8}>
        {track && <TrackMeta track={track} />}

        <VStack alignSelf={'center'} mt={2} gap={0}>
          <PlayControls />
          <TrackProgress />
        </VStack>

        <VolumeBar />
      </SimpleGrid>
    )) || <></>
  );
}
