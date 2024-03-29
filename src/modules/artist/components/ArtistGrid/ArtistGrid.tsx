import { SimpleGrid } from '@chakra-ui/react';

import { CardSpotify } from 'components/Card/CardSpotify';
import { IArtist } from 'types/artist';

interface ArtistGridProps {
  artists: IArtist[];
  [others: string]: any;
}

export function ArtistGrid(props: ArtistGridProps) {
  const { artists, ...others } = props;

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      gap={4}
      {...others}
    >
      {artists?.map((artist, index) => {
        return (
          <CardSpotify key={artist.id || index} type="artist" data={artist} />
        );
      })}
    </SimpleGrid>
  );
}
