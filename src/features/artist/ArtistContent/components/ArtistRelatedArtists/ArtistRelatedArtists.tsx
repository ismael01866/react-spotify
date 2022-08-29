import { useContext } from 'react';
import { ArtistContext } from 'src/features/artist/ArtistContext';
import { ArtistGridRelatedArtists } from './components';

export function ArtistRelatedArtists() {
  const { artistID } = useContext(ArtistContext);

  return (
    <>
      <ArtistGridRelatedArtists
        artistID={artistID}
        limit={6}
        columns={{ base: 1, sm: 2, md: 3 }}
      />
    </>
  );
}
