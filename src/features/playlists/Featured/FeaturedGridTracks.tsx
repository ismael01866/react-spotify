import { SimpleGrid, Skeleton } from '@chakra-ui/react';
import { useTopTracks } from 'src/lib/hooks/services';

import { CardTrack } from 'src/components/Card/CardTrack';

export function FeaturedGridTracks() {
  const skeletonTracks = new Array(6).fill('');

  const { tracks, isLoading } = useTopTracks(skeletonTracks, {
    method: 'POST',
    body: JSON.stringify({ limit: 6 })
  });

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 6 }} spacing={4}>
      {tracks.map((track, index) => {
        return (
          <Skeleton key={track.id || index} isLoaded={!isLoading}>
            <CardTrack track={track} />
          </Skeleton>
        );
      })}
    </SimpleGrid>
  );
}
