import {
  Box,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { UserRowTrack } from 'src/modules/users/components/UserTableTracks/components';
import { useMeTopTracksWithFollow } from 'src/utils/hooks/services';

export function UserMeTopTracksContent() {
  const limit = 50;
  const time_range = 'short_term';

  const { tracks, isLoading } = useMeTopTracksWithFollow({
    limit,
    time_range
  });

  const skeletonData = new Array(limit).fill('');
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
    <Box
      overflowY={'scroll'}
      px={12}
      sx={{
        scrollbarWidth: 'thin'
      }}
    >
      {(!isLoading && (
        <TableContainer>
          <Table size={'sm'} variant={'simple-with-hover'}>
            <colgroup>
              <col style={{ width: 'auto' }} />
              <col style={{ width: '60%' }} />
              <col style={{ width: '40%' }} />
              <col style={{ width: 'auto' }} />
              <col style={{ width: 'auto' }} />
            </colgroup>

            <Thead>
              <Tr>
                <Th textAlign={'right'}>#</Th>
                <Th px={0}>Title</Th>
                <Th px={0}>Album</Th>
                <Th></Th>
                <Th>Duration</Th>
              </Tr>
            </Thead>

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
      )) || <LoadingContent />}
    </Box>
  );
}
