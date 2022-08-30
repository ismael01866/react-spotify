import { SimpleGrid } from '@chakra-ui/react';
import { ArtistCard } from 'src/modules/artists/components';
import { useTopArtists } from 'src/utils/hooks/services';

export interface FeaturedGridArtistsProps {
  limit?: number;
  [others: string]: any;
}

export function FeaturedGridArtists(props: FeaturedGridArtistsProps) {
  const { limit, ...others } = props;
  const { artists, isLoading } = useTopArtists({ limit });

  const skeletonData = new Array(limit).fill('');
  const data = isLoading ? skeletonData : artists;

  return (
    <SimpleGrid spacing={4} {...others}>
      {data?.map((artist, index) => {
        return <ArtistCard key={artist.id || index} artist={artist} />;
      })}
    </SimpleGrid>
  );
}
