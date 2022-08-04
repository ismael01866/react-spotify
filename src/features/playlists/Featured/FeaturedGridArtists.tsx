import { SimpleGrid, Skeleton } from '@chakra-ui/react';
import { CardArtist } from 'src/components/Card/CardArtist';

import { useTopArtists } from 'src/lib/hooks/services';

export function FeaturedGridArtists() {
  const skeletonArtists = new Array(12).fill('');

  const { artists, isLoading } = useTopArtists(skeletonArtists, {
    method: 'POST',
    body: JSON.stringify({ limit: 8 })
  });

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
