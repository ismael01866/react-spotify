import { ArtistGrid } from 'src/modules/artist/components';
import { useMeTopArtists } from 'src/hooks/services';

export function UserMeContentGridTopArtists() {
  const limit = 6;
  const time_range = 'short_term';

  const { artists, isLoading } = useMeTopArtists({ limit, time_range });

  const skeletonData = new Array(limit).fill('');
  const data = isLoading ? skeletonData : artists;

  return (data && <ArtistGrid artists={data} />) || <></>;
}
