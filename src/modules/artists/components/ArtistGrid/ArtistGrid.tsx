import { SimpleGrid } from '@chakra-ui/react';
import { ArtistCard } from 'src/modules/artists/components';
import { IArtist } from 'src/types/artist';

export interface ArtistGridProps {
  data: IArtist[];
  [others: string]: any;
}

export function ArtistGrid(props: ArtistGridProps) {
  const { data, ...others } = props;

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 6 }}
      spacing={4}
      {...others}
    >
      {data?.map((artist, index) => {
        return <ArtistCard key={artist.id || index} artist={artist} />;
      })}
    </SimpleGrid>
  );
}
