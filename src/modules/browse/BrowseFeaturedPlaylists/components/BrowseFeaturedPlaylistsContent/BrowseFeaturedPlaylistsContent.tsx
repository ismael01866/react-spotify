import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { PlaylistGrid } from 'src/modules/playlist/components';
import { BrowseFeaturedPlaylistsContext } from 'src/state';

export function BrowseFeaturedPlaylistsContent() {
  const { playlists } = useContext(BrowseFeaturedPlaylistsContext);

  return (
    <Box>{playlists && <PlaylistGrid playlists={playlists} />}</Box>
  );
}
