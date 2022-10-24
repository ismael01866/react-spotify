import { Stack } from '@chakra-ui/react';
import { useContext } from 'react';
import { Skeleton } from 'src/components/Skeleton';
import { PlaylistTableTracks } from 'src/modules/playlist/components';
import { PlaylistContext } from 'src/state';
import { usePlaylistTracksWithFollow } from 'src/hooks/services';

export function PlaylistTracks() {
  const { id: playlistID } = useContext(PlaylistContext);

  const { tracks, isLoading } = usePlaylistTracksWithFollow(playlistID);

  const skeletonData = new Array(20).fill('');
  const data = isLoading ? skeletonData : tracks;

  const LoadingContent = () => {
    return (
      <Stack spacing={4}>
        {data?.map((_, index) => (
          <Skeleton key={index} height={20} />
        ))}
      </Stack>
    );
  };

  return (
    (!isLoading && data && <PlaylistTableTracks tracks={data} />) || (
      <LoadingContent />
    )
  );
}
