import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { ArtistGrid } from 'src/modules/artists/components';
import { UserMeTopArtistsContext } from '../../UserMeTopArtistsContext';

export function UserMeTopArtistsContent() {
  const data = useContext(UserMeTopArtistsContext);

  return (
    <Box>
      <ArtistGrid artists={data} />
    </Box>
  );
}
