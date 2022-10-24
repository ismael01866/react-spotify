import { useContext } from 'react';

import { ArtistGrid } from 'modules/artist/components';
import { UserMeTopArtistsContext } from 'state';

export function UserMeTopArtistsContent() {
  const data = useContext(UserMeTopArtistsContext);

  return <ArtistGrid artists={data} />;
}
