import { SimpleGrid, Skeleton } from '@chakra-ui/react';
import { useTopTracks } from 'src/lib/hooks/services';

import { CardTrack } from 'src/components/Card/CardTrack';

export function FeaturedGridTracks() {
  const limit = 6;
  const { tracks, isLoading } = useTopTracks({ limit });

  const skeletonTracks = new Array(limit).fill('');
  const data = isLoading ? skeletonTracks : tracks;

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 6 }} spacing={4}>
      {data?.map((track, index) => {
        return (
          <Skeleton key={track.id || index} isLoaded={!isLoading}>
            <CardTrack track={track} />
          </Skeleton>
        );
      })}
    </SimpleGrid>
  );
}
