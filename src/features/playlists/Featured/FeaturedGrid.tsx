import { SimpleGrid, Skeleton } from '@chakra-ui/react';
import { CardArtist } from 'src/components/Card/CardArtist';

import { useTopArtists } from 'src/lib';

export function FeaturedGrid() {
  const skeletonArtists = new Array(12).fill('');
  const { artists, isLoading } = useTopArtists(skeletonArtists);

  return (
    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
      {artists.map((artist) => {
        return (
          <Skeleton key={artist.id} isLoaded={!isLoading}>
            <CardArtist artist={artist} />
          </Skeleton>
        );
      })}
    </SimpleGrid>
  );
}
