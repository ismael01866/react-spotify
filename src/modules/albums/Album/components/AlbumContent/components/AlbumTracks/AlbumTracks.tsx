import { useContext } from 'react';
import { AlbumTableTracks } from 'src/modules/albums/components';
import { TrackLoadingStack } from 'src/modules/tracks/components';
import { UserContext } from 'src/modules/users/User/UserContext';
import { AlbumContext } from 'src/state';
import { ITrack } from 'src/types/track';
import { useAlbumTracksWithFollow } from 'src/utils/hooks/services';

export function AlbumTracks() {
  const { country } = useContext(UserContext);
  const { id: albumID } = useContext(AlbumContext);

  const { tracks, isLoading } = useAlbumTracksWithFollow(albumID, {
    country,
    limit: 50
  });

  return (
    (!isLoading && (
      <AlbumTableTracks tracks={tracks as ITrack[]} />
    )) || <TrackLoadingStack />
  );
}
