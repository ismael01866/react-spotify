import { TrackGrid } from 'src/modules/tracks/components';
import { useMePlayerRecentlyPlayed } from 'src/utils/hooks/services';

export function HomeUserMePlayerRecentlyPlayed() {
  const limit = 6;

  const { tracks, isLoading } = useMePlayerRecentlyPlayed({
    limit: 50
  });

  const skeletonData = new Array(limit).fill('');

  // since the actual tracks payload can contain up to 50 results
  // (but the may be grouped), we need to reduce the actual results to
  // be displayed to the actual limit

  const data = isLoading
    ? skeletonData
    : [...(tracks || [])].splice(0, limit);

  return (data && <TrackGrid tracks={data} />) || <></>;
}
