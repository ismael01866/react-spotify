import { Box } from '@chakra-ui/react';

import { useMeTracksWithFollow } from 'hooks/services';
import { CollectionTableTracks } from 'modules/collection/components/CollectionTableTracks/CollectionTableTracks';

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
