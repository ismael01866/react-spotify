import { SimpleGrid } from '@chakra-ui/react';
import { ArtistCard } from 'src/modules/artists/components';
import { IArtist } from 'src/types/artist';

export interface ArtistGridRelatedArtistsProps {
  data: IArtist[];
  [others: string]: any;
}

export function ArtistGridRelatedArtists(
  props: ArtistGridRelatedArtistsProps
) {
  const { data, ...others } = props;

  return (
    <SimpleGrid spacing={4} {...others}>
      {data?.map((artist, index) => {
        return <ArtistCard key={artist.id || index} artist={artist} />;
      })}
    </SimpleGrid>
  );
}
