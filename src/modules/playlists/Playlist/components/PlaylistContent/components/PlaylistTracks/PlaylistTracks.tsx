import { Stack } from '@chakra-ui/react';
import { useContext } from 'react';
import { Skeleton } from 'src/components/Skeleton';
import { PlaylistTableTracks } from 'src/modules/playlists/components';
import { PlaylistContext } from 'src/modules/playlists/Playlist/PlaylistContext';
import { ITrack } from 'src/types/track';
import { usePlaylistTracksWithFollow } from 'src/utils/hooks/services';

export function PlaylistTracks() {
  const { id: playlistID } = useContext(PlaylistContext);

  const { tracks, isLoading } = usePlaylistTracksWithFollow(playlistID);

  const skeletonData = new Array(20).fill('');
  const data = isLoading ? skeletonData : (tracks as ITrack[]);

  const LoadingContent = () => {
    return (
      <Stack spacing={4}>
        {data.map((_, index) => (
          <Skeleton key={index} height={20} />
        ))}
      </Stack>
    );
  };

  return (
    (!isLoading && <PlaylistTableTracks tracks={data} />) || (
      <LoadingContent />
    )
  );
}
