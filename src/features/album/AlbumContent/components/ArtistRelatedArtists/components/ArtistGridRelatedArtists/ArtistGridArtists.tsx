import { SimpleGrid } from '@chakra-ui/react';
import { useContext } from 'react';
import { CardArtist } from 'src/components/Card/CardArtist';
import { ArtistContext } from 'src/features/artist/ArtistContext';
import { useArtistRelatedArtists } from 'src/lib/hooks/services';

export interface ArtistGridRelatedArtistsProps {
  limit?: number;
  [others: string]: any;
}

export function ArtistGridRelatedArtists(
  props: ArtistGridRelatedArtistsProps
) {
  const { artistID } = useContext(ArtistContext);

  const { limit, ...others } = props;
  const { artists, isLoading } = useArtistRelatedArtists(artistID);

  const skeletonData = new Array(limit).fill('');
  const data = isLoading
    ? skeletonData
    : artists && [...artists].splice(0, limit);

  return (
    <SimpleGrid spacing={4} {...others}>
      {data?.map((artist, index) => {
        return <CardArtist key={artist.id || index} artist={artist} />;
      })}
    </SimpleGrid>
  );
}
