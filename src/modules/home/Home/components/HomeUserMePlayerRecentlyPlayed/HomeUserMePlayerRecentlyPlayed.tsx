import { TrackGrid } from 'src/modules/tracks/components';
import { useMePlayerRecentlyPlayed } from 'src/utils/hooks/services';

export function HomeUserMePlayerRecentlyPlayed() {
  const limit = 6;

  const { tracks, isLoading } = useMePlayerRecentlyPlayed({ limit });

  const skeletonData = new Array(limit).fill('');
  const data = isLoading ? skeletonData : tracks;

  return (data && <TrackGrid tracks={data} />) || <></>;
}
