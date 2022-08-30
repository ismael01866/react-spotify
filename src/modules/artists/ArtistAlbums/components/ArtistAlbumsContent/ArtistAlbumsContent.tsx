import { useContext } from 'react';
import { ArtistContext } from 'src/modules/artists/Artist/ArtistContext';
import { ArtistGridAlbums } from 'src/modules/artists/components';

export function ArtistAlbumsContent() {
  const { id: artistID } = useContext(ArtistContext);

  return (
    (artistID && (
      <ArtistGridAlbums
        artistID={artistID}
        limit={20}
        columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      />
    )) || <></>
  );
}
