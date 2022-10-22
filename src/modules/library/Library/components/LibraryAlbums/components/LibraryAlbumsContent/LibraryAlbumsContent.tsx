import { useContext, useEffect, useState } from 'react';
import { AlbumGrid } from 'src/modules/album/components';
import { LibraryAlbumsContext } from 'src/state';
import { IAlbum } from 'src/types/album';

export function LibraryAlbumsContent() {
  const { albumsFiltered } = useContext(LibraryAlbumsContext);

  const skeletonData = new Array(20).fill('');
  const [albums, setAlbums] = useState<IAlbum[]>(skeletonData);

  useEffect(() => {
    if (albumsFiltered) setAlbums(albumsFiltered);
  }, [albumsFiltered]);

  return <AlbumGrid albums={albums} />;
}
