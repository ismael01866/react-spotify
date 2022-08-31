import { useContext } from 'react';
import { ArtistContext } from 'src/modules/artists/Artist/ArtistContext';
import { ArtistGridRelatedArtists } from 'src/modules/artists/components';
import { useArtistRelatedArtists } from 'src/utils/hooks/services';

export function ArtistRelatedArtists() {
  const { id: artistID } = useContext(ArtistContext);
  const { artists, isLoading } = useArtistRelatedArtists(artistID);

  const limit = 6;

  const skeletonData = new Array(limit).fill('');
  const data = isLoading
    ? skeletonData
    : artists && [...artists].splice(0, limit);

  return (
    (data && (
      <ArtistGridRelatedArtists
        data={data}
        columns={{ base: 1, sm: 2, xl: 3 }}
      />
    )) || <></>
  );
}
