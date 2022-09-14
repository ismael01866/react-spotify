import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { PlaylistGrid } from 'src/modules/playlists/components';
import { BrowseFeaturedPlaylistsContext } from '../../BrowseFeaturedPlaylistsContext';

export function BrowseFeaturedPlaylistsContent() {
  const { playlists } = useContext(BrowseFeaturedPlaylistsContext);

  return (
    <Box
      overflowY={'scroll'}
      px={12}
      sx={{
        scrollbarWidth: 'thin'
      }}
    >
      {playlists && (
        <PlaylistGrid
          playlists={playlists}
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        />
      )}
    </Box>
  );
}