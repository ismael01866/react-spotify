import { Box } from '@chakra-ui/react';
import { TrackGrid } from 'src/modules/track/components';
import { useMePlayerRecentlyPlayed } from 'src/utils/hooks/services';

export function UserMeRecentlyPlayedContent() {
  const limit = 50;

  const { tracks, isLoading } = useMePlayerRecentlyPlayed();

  const skeletonData = new Array(limit).fill('');

  // since the actual tracks payload can contain up to 50 results
  // (but the may be grouped), we need to reduce the actual results to
  // be displayed to the actual limit

  const data = isLoading
    ? skeletonData
    : [...(tracks || [])].splice(0, limit);

  return <Box>{data && <TrackGrid tracks={data} />}</Box>;
}
