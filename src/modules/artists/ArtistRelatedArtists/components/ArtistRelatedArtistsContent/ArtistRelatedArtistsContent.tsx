import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { ArtistContext } from 'src/modules/artists/Artist/ArtistContext';
import { ArtistGrid } from 'src/modules/artists/components';
import { useArtistRelatedArtists } from 'src/utils/hooks/services';

export function ArtistRelatedArtistsContent() {
  const { id: artistID } = useContext(ArtistContext);
  const { artists, isLoading } = useArtistRelatedArtists(artistID);

  const skeletonData = new Array(20).fill('');
  const data = isLoading ? skeletonData : artists;

  return (
    <Box>
      {data && (
        <ArtistGrid
          artists={data}
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        />
      )}
    </Box>
  );
}
