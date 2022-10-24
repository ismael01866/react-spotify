import { useContext } from 'react';
import { Box } from '@chakra-ui/react';

import { ArtistGrid } from 'modules/artist/components';
import { ArtistRelatedArtistsContext } from 'state';

export function ArtistRelatedArtistsContent() {
  const data = useContext(ArtistRelatedArtistsContext);

  return (
    <Box>
      <ArtistGrid
        artists={data}
        columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      />
    </Box>
  );
}
