import { UserMeTableTopTracks } from 'src/modules/users/components';
import { useMeTopTracks } from 'src/utils/hooks/services';

export function UserMeContentTableTopTracks() {
  const limit = 6;
  const time_range = 'short_term';

  const { tracks, isLoading } = useMeTopTracks({ limit, time_range });

  const skeletonData = new Array(limit).fill('');
  const data = isLoading ? skeletonData : tracks;

  return (data && <UserMeTableTopTracks tracks={data} />) || <></>;
}
