import { useContext } from 'react';
import { ArtistContext } from 'src/modules/artists/Artist/ArtistContext';
import { ArtistGridRelatedArtists } from './components';

export function ArtistRelatedArtists() {
  const { id: artistID } = useContext(ArtistContext);

  return (
    (artistID && (
      <ArtistGridRelatedArtists
        artistID={artistID}
        limit={6}
        columns={{ base: 1, sm: 2, md: 3 }}
      />
    )) || <></>
  );
}
