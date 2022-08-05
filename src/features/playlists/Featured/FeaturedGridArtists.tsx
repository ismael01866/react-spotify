import { SimpleGrid, Skeleton } from '@chakra-ui/react';
import { CardArtist } from 'src/components/Card/CardArtist';

import { IArtist } from 'src/types/artist';

export interface FeaturedGridArtists {
  artists: IArtist[];
  isLoading: Boolean;
}

export function FeaturedGridArtists(props: FeaturedGridArtists) {
  const { artists, isLoading } = props;

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
      {artists.map((artist, index) => {
        return (
          <Skeleton key={artist.id || index} isLoaded={!isLoading}>
            <CardArtist artist={artist} />
          </Skeleton>
        );
      })}
    </SimpleGrid>
  );
}
