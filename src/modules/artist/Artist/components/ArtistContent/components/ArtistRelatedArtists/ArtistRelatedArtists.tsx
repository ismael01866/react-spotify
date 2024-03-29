import { useContext } from 'react';
import { Heading } from '@chakra-ui/react';

import { useArtistRelatedArtists } from 'hooks/services';
import { ArtistGrid } from 'modules/artist/components';
import { ArtistContext } from 'state';

export function ArtistRelatedArtists() {
  const { id: artistID } = useContext(ArtistContext);
  const { artists, isLoading } = useArtistRelatedArtists(artistID);

  const limit = 6;

  const skeletonData = new Array(limit).fill('');
  const data = isLoading
    ? skeletonData
    : artists && [...artists].splice(0, limit);

  return (
    (data?.length && (
      <ArtistGrid artists={data} columns={{ base: 1, sm: 2, xl: 3 }} />
    )) || (
      <Heading color={'text.muted'} size={'sm'}>
        No information available
      </Heading>
    )
  );
}
