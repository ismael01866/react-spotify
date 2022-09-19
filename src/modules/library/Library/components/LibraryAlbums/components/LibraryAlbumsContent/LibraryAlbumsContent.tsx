import { useEffect, useState } from 'react';
import { AlbumGrid } from 'src/modules/albums/components/AlbumGrid';
import { IAlbum } from 'src/types/album';
import { TABS_RENDER_WAIT_DURATION } from 'src/utils/constants';
import { useMeAlbumsAll } from 'src/utils/hooks/services';
import { setTimeout } from 'timers';

export function LibraryAlbumsContent() {
  const { albums } = useMeAlbumsAll();

  const skeletonData = new Array(20).fill('');
  const [data, setData] = useState<IAlbum[]>(skeletonData);

  useEffect(() => {
    if (!albums?.length) return;

    setTimeout(() => {
      setData(albums);
    }, TABS_RENDER_WAIT_DURATION);
  }, [albums]);

  return (
    <AlbumGrid
      albums={data}
      columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
    />
  );
}
