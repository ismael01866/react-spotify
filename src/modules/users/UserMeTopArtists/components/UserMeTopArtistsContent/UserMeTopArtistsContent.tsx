import { Box } from '@chakra-ui/react';
import { ArtistGrid } from 'src/modules/artists/components';
import { useMeTopArtists } from 'src/utils/hooks/services';

export function UserMeTopArtistsContent() {
  const limit = 50;
  const time_range = 'short_term';

  const { artists, isLoading } = useMeTopArtists({ limit, time_range });

  const skeletonData = new Array(limit).fill('');
  const data = isLoading ? skeletonData : artists;

  return (
    <Box
      overflowY={'scroll'}
      px={12}
      sx={{
        scrollbarWidth: 'thin'
      }}
    >
      {data && <ArtistGrid data={data} />}
    </Box>
  );
}
