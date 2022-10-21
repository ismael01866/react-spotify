import { useContext } from 'react';
import { ArtistGrid } from 'src/modules/artist/components';
import { UserMeTopArtistsContext } from 'src/state';

export function UserMeTopArtistsContent() {
  const data = useContext(UserMeTopArtistsContext);

  return <ArtistGrid artists={data} />;
}
