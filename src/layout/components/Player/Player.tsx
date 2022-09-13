import { SimpleGrid, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectTrack } from 'src/modules';
import { useMePlayerCurrentlyPlaying } from 'src/utils/hooks/services';
import {
  PlayControls,
  TrackMeta,
  TrackProgress,
  VolumeBar
} from './components';

export function Player() {
  const track = useSelector(selectTrack);
  const { item } = useMePlayerCurrentlyPlaying();

  return (
    <SimpleGrid h={'6xs'} w={'full'} columns={3} spacing={8}>
      {item && (
        <TrackMeta
          album={item.album}
          artist={item.artists[0]}
          track={track}
        />
      )}

      <VStack alignSelf={'center'} mt={2} spacing={0}>
        <PlayControls />
        <TrackProgress />
      </VStack>

      <VolumeBar />
    </SimpleGrid>
  );
}
