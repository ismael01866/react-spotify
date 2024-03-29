import { Stack, Table, TableContainer, Tbody } from '@chakra-ui/react';

import { Skeleton } from 'components/Skeleton';
import { useMeTopTracksWithFollow } from 'hooks/services';
import { UserRowTrack } from 'modules/user/components/UserTableTracks/components';

export function UserMeContentTableTopTracks() {
  const limit = 5;
  const time_range = 'short_term';

  const { tracks, isLoading } = useMeTopTracksWithFollow({
    limit,
    time_range
  });

  const skeletonData = new Array(limit).fill('');
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
    (!isLoading && (
      <TableContainer>
        <Table size={'sm'} variant={'simple-with-hover'}>
          <colgroup>
            <col style={{ width: 'auto' }} />
            <col style={{ width: '60%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: 'auto' }} />
          </colgroup>

          <Tbody>
            {data?.map((track, index) => (
              <UserRowTrack
                key={track.id || index}
                index={index + 1}
                track={track}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    )) || <LoadingContent />
  );
}
