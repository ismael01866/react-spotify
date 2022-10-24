import { useContext, useEffect, useState } from 'react';

import { PlaylistGrid } from 'modules/playlist/components/PlaylistGrid';
import { LibraryPlaylistsContext } from 'state';
import { IPlaylist } from 'types/playlist';

export function LibraryPlaylistsContent() {
  const { playlistsFiltered } = useContext(LibraryPlaylistsContext);

  const skeletonData = new Array(20).fill('');
  const [playlists, setPlaylists] = useState<IPlaylist[]>(skeletonData);

  useEffect(() => {
    if (playlistsFiltered) setPlaylists(playlistsFiltered);
  }, [playlistsFiltered]);

  return <PlaylistGrid playlists={playlists} />;
}
