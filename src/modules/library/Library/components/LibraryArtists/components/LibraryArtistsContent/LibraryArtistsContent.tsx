import { useContext } from 'react';
import { ArtistGrid } from 'src/modules/artist/components/ArtistGrid';
import { LibraryArtistsContext } from 'src/state';

export function LibraryArtistsContent() {
  const skeletonData = new Array(20).fill('');
  const { artistsFiltered = skeletonData } = useContext(
    LibraryArtistsContext
  );

  return <ArtistGrid artists={artistsFiltered} />;
}
