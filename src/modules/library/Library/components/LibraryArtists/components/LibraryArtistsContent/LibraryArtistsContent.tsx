import { useEffect, useState } from 'react';
import { ArtistGrid } from 'src/modules/artists/components/ArtistGrid';
import { IArtist } from 'src/types/artist';
import { TABS_RENDER_WAIT_DURATION } from 'src/utils/constants';
import { useMeArtistsAll } from 'src/utils/hooks/services';
import { setTimeout } from 'timers';

export function LibraryArtistsContent() {
  const { artists } = useMeArtistsAll();

  const skeletonData = new Array(20).fill('');
  const [data, setData] = useState<IArtist[]>(skeletonData);

  useEffect(() => {
    if (!artists?.length) return;

    setTimeout(() => {
      setData(artists);
    }, TABS_RENDER_WAIT_DURATION);
  }, [artists]);

  return (
    <ArtistGrid
      artists={data}
      columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
    />
  );
}
