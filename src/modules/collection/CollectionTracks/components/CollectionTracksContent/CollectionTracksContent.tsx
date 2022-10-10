import { Box } from '@chakra-ui/react';
import { CollectionTableTracks } from 'src/modules/collection/components/CollectionTableTracks/CollectionTableTracks';
import { useMeTracksWithFollow } from 'src/utils/hooks/services';

export function CollectionTracksContent() {
  const { total } = useMeTracksWithFollow(
    {
      limit: 1
    },
    {},
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const skeletonData = new Array(total).fill('');

  return (
    <Box>
      <CollectionTableTracks skeletonTracks={skeletonData} />
    </Box>
  );
}
