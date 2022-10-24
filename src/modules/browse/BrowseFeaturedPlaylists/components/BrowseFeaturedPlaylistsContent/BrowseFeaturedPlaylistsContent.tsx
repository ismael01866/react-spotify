import { useContext } from 'react';
import { Box } from '@chakra-ui/react';

import { PlaylistGrid } from 'modules/playlist/components';
import { BrowseFeaturedPlaylistsContext } from 'state';

export function BrowseFeaturedPlaylistsContent() {
  const { playlists } = useContext(BrowseFeaturedPlaylistsContext);

  return <Box>{playlists && <PlaylistGrid playlists={playlists} />}</Box>;
}
