import { useContext } from 'react';
import { AlbumContext } from 'src/modules/albums/Album/AlbumContext';
import { AlbumGrid } from 'src/modules/albums/components/AlbumGrid';
import { useArtistAlbums } from 'src/utils/hooks/services';

export function ArtistAlbums() {
  const album = useContext(AlbumContext);
  const artistID = album?.artists?.[0].id;

  const { albums, isLoading } = useArtistAlbums(artistID, {
    limit: 6,
    include_groups: 'album'
  });

  const skeletonData = new Array(6).fill('');
  const data = isLoading ? skeletonData : albums;

  return (
    (data && (
      <AlbumGrid albums={data} columns={{ base: 1, sm: 2, xl: 3 }} />
    )) || <></>
  );
}
