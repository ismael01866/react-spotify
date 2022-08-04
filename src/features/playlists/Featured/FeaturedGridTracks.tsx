import { SimpleGrid, Skeleton } from '@chakra-ui/react';
import { useTopTracks } from 'src/lib/hooks/services';
// import { CardArtist } from 'src/components/Card/CardArtist';

export function FeaturedGridTracks() {
  const skeletonTracks = new Array(12).fill('');

  const { tracks, isLoading } = useTopTracks(skeletonTracks, {
    method: 'POST',
    body: JSON.stringify({ limit: 8 })
  });

  return (
    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
      {tracks.map((track) => {
        return (
          <Skeleton key={track.id} isLoaded={!isLoading}>
            {/* <CardArtist track={track} /> */}
          </Skeleton>
        );
      })}
    </SimpleGrid>
  );
}
