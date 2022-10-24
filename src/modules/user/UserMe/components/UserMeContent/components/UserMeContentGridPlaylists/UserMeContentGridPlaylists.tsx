import { useMePlaylists } from 'hooks/services/useMePlaylists';
import { PlaylistGrid } from 'modules/playlist/components';

export function UserMeContentGridPlaylists() {
  const limit = 10;

  const { playlists, isLoading } = useMePlaylists({ limit });

  const skeletonData = new Array(limit).fill('');
  const data = isLoading ? skeletonData : playlists;

  return (data && <PlaylistGrid playlists={data} />) || <></>;
}
