import { useContext } from 'react';
import { Stack } from '@chakra-ui/react';

import { Skeleton } from 'components/Skeleton';
import { usePlaylistTracksWithFollow } from 'hooks/services';
import { PlaylistTableTracks } from 'modules/playlist/components';
import { PlaylistContext } from 'state';

export function PlaylistTracks() {
  const { id: playlistID } = useContext(PlaylistContext);

  const { tracks, isLoading } = usePlaylistTracksWithFollow(playlistID);

  const skeletonData = new Array(20).fill('');
  const data = isLoading ? skeletonData : tracks;

  const LoadingContent = () => {
    return (
      <Stack gap={4}>
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
