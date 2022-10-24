import { Stack } from '@chakra-ui/react';

import { Skeleton } from 'components/Skeleton';
import { useMeTopTracksWithFollow } from 'hooks/services';
import { UserTableTracks } from 'modules/user/components';

export function UserMeTopTracks() {
  const limit = 50;
  const time_range = 'short_term';

  const { tracks, isLoading } = useMeTopTracksWithFollow({
    limit,
    time_range
  });

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
    (!isLoading && data && <UserTableTracks tracks={data} />) || (
      <LoadingContent />
    )
  );
}
