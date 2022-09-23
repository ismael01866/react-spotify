import { useContext } from 'react';
import { ArtistGrid } from 'src/modules/artists/components';
import { UserMeTopArtistsContext } from '../../UserMeTopArtistsContext';

export function UserMeTopArtistsContent() {
  const data = useContext(UserMeTopArtistsContext);

  return <ArtistGrid artists={data} />;
}
