import { useContext, useEffect, useState } from 'react';
import { ArtistGrid } from 'src/modules/artists/components/ArtistGrid';
import { IArtist } from 'src/types/artist';
import { LibraryArtistsContext } from '../../LibraryArtistsContext';

export function LibraryArtistsContent() {
  const { artistsFiltered } = useContext(LibraryArtistsContext);

  const skeletonData = new Array(20).fill('');
  const [artists, setArtists] = useState<IArtist[]>(skeletonData);

  useEffect(() => {
    if (artistsFiltered) setArtists(artistsFiltered);
  }, [artistsFiltered]);

  return (
    <ArtistGrid
      artists={artists}
      columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
    />
  );
}
