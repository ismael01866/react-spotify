import { SimpleGrid } from '@chakra-ui/react';
import { ArtistCard } from 'src/modules/artists/components';
import { useArtistRelatedArtists } from 'src/utils/hooks/services';

export interface ArtistGridRelatedArtistsProps {
  artistID: string | string[];
  limit?: number;
  [others: string]: any;
}

export function ArtistGridRelatedArtists(
  props: ArtistGridRelatedArtistsProps
) {
  const { artistID, limit, ...others } = props;
  const { artists, isLoading } = useArtistRelatedArtists(artistID);

  const skeletonData = new Array(limit).fill('');
  const data = isLoading
    ? skeletonData
    : artists && [...artists].splice(0, limit);

  return (
    <SimpleGrid spacing={4} {...others}>
      {data?.map((artist, index) => {
        return <ArtistCard key={artist.id || index} artist={artist} />;
      })}
    </SimpleGrid>
  );
}