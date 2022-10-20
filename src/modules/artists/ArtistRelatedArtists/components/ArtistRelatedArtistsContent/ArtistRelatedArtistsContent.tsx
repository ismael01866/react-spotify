import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { ArtistGrid } from 'src/modules/artists/components';
import { ArtistRelatedArtistsContext } from 'src/state';

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
