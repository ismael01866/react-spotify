import { SimpleGrid, Skeleton } from '@chakra-ui/react';
import { CardArtist } from 'src/components/Card/CardArtist';
import { useTopArtists } from 'src/lib/hooks/services';

export interface FeaturedGridArtistsProps {
  limit?: number;
}

export function FeaturedGridArtists(props: FeaturedGridArtistsProps) {
  const { limit } = props;
  const { artists, isLoading } = useTopArtists({ limit });

  const skeletonData = new Array(limit).fill('');
  const data = isLoading ? skeletonData : artists;

  return (
    (data && (
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
        {data.map((artist, index) => {
          return (
            <Skeleton key={artist.id || index} isLoaded={!isLoading}>
              <CardArtist artist={artist} />
            </Skeleton>
          );
        })}
      </SimpleGrid>
    )) || <></>
  );
}
