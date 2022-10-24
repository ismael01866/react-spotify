import { PlaylistGrid } from 'src/modules/playlist/components';
import { useMePlaylists } from 'src/hooks/services/useMePlaylists';

export function UserMeContentGridPlaylists() {
  const limit = 6;

  const { playlists, isLoading } = useMePlaylists({ limit });

  const skeletonData = new Array(limit).fill('');
  const data = isLoading ? skeletonData : playlists;

  return (data && <PlaylistGrid playlists={data} />) || <></>;
}
