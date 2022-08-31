import { useContext } from 'react';
import { ArtistContext } from 'src/modules/artists/Artist/ArtistContext';
import { ArtistGridAlbums } from 'src/modules/artists/components';
import { useArtistAlbums } from 'src/utils/hooks/services';

export function ArtistAlbumsContent() {
  const { id: artistID } = useContext(ArtistContext);
  const { albums, isLoading } = useArtistAlbums(artistID, {
    limit: 50
  });

  const skeletonData = new Array(20).fill('');
  const data = isLoading ? skeletonData : albums;

  return (
    (data && (
      <ArtistGridAlbums
        data={data}
        columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      />
    )) || <></>
  );
}
