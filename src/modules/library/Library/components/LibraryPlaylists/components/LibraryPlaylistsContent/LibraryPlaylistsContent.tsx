import { useContext, useEffect, useState } from 'react';
import { PlaylistGrid } from 'src/modules/playlists/components/PlaylistGrid';
import { IPlaylist } from 'src/types/playlist';
import { LibraryPlaylistsContext } from '../../LibraryPlaylistsContext';

export function LibraryPlaylistsContent() {
  const { playlistsFiltered } = useContext(LibraryPlaylistsContext);

  const skeletonData = new Array(20).fill('');
  const [playlists, setPlaylists] = useState<IPlaylist[]>(skeletonData);

  useEffect(() => {
    if (playlistsFiltered) setPlaylists(playlistsFiltered);
  }, [playlistsFiltered]);

  return (
    <PlaylistGrid
      playlists={playlists}
      columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
    />
  );
}
