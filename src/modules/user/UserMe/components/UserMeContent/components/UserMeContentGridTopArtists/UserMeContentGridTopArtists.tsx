import { useMeTopArtists } from 'hooks/services';
import { ArtistGrid } from 'modules/artist/components';

export function UserMeContentGridTopArtists() {
  const limit = 5;
  const time_range = 'short_term';

  const { artists, isLoading } = useMeTopArtists({ limit, time_range });

  const skeletonData = new Array(limit).fill('');
  const data = isLoading ? skeletonData : artists;

  return (data && <ArtistGrid artists={data} />) || <></>;
}
