import { Box, Flex, Skeleton, Stack } from '@chakra-ui/react';
import { useMeTopTracksWithFollow } from 'src/utils/hooks/services';
import {
  UserMeTopTracksContentTableBody,
  UserMeTopTracksContentTableHead
} from './components';

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

  const TableColGroups = (
    <colgroup>
      <col style={{ minWidth: '4rem' }} />
      <col style={{ width: '60%' }} />
      <col style={{ width: '40%' }} />
      <col style={{ width: 'auto' }} />
      <col style={{ width: 'auto' }} />
    </colgroup>
  );

  return (
    <Flex direction={'column'} overflow={'hidden'}>
      <Box px={12}>
        <UserMeTopTracksContentTableHead
          tableColGroups={TableColGroups}
        />
      </Box>

      <Box
        overflowY={'scroll'}
        px={12}
        sx={{
          scrollbarWidth: 'thin'
        }}
      >
        {(!isLoading && data && (
          <UserMeTopTracksContentTableBody
            tracks={data}
            tableColGroups={TableColGroups}
          />
        )) || <LoadingContent />}
      </Box>
    </Flex>
  );
}
