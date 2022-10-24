import { useContext } from 'react';

import { ArtistGrid } from 'modules/artist/components/ArtistGrid';
import { LibraryArtistsContext } from 'state';

export function LibraryArtistsContent() {
  const skeletonData = new Array(20).fill('');
  const { artistsFiltered = skeletonData } = useContext(LibraryArtistsContext);

  return <ArtistGrid artists={artistsFiltered} />;
}
