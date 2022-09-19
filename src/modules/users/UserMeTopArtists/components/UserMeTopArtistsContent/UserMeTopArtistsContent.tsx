import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { ArtistGrid } from 'src/modules/artists/components';
import { UserMeTopArtistsContext } from '../../UserMeTopArtistsContext';

export function UserMeTopArtistsContent() {
  const skeletonData = new Array(20).fill('');
  const data = useContext(UserMeTopArtistsContext) || skeletonData;

  return <Box>{data && <ArtistGrid artists={data} />}</Box>;
}
