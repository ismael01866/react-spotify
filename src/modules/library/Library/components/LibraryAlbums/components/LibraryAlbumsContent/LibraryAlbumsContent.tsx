import { useContext, useEffect, useState } from 'react';
import { AlbumGrid } from 'src/modules/albums/components/AlbumGrid';
import { IAlbum } from 'src/types/album';
import { LibraryAlbumsContext } from '../../LibraryAlbumsContext';

export function LibraryAlbumsContent() {
  const { albumsFiltered } = useContext(LibraryAlbumsContext);

  const skeletonData = new Array(20).fill('');
  const [albums, setAlbums] = useState<IAlbum[]>(skeletonData);

  useEffect(() => {
    if (albumsFiltered) setAlbums(albumsFiltered);
  }, [albumsFiltered]);

  return (
    <AlbumGrid
      albums={albums}
      columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
    />
  );
}
