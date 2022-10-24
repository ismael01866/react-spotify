import { useContext, useEffect, useState } from 'react';

import { AlbumGrid } from 'modules/album/components';
import { LibraryAlbumsContext } from 'state';
import { IAlbum } from 'types/album';

export function LibraryAlbumsContent() {
  const { albumsFiltered } = useContext(LibraryAlbumsContext);

  const skeletonData = new Array(20).fill('');
  const [albums, setAlbums] = useState<IAlbum[]>(skeletonData);

  useEffect(() => {
    if (albumsFiltered) setAlbums(albumsFiltered);
  }, [albumsFiltered]);

  return <AlbumGrid albums={albums} />;
}
