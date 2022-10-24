import { useContext } from 'react';

import { useAlbumTracksWithFollow } from 'hooks/services';
import { AlbumTableTracks } from 'modules/album/components';
import { TrackLoadingStack } from 'modules/track/components';
import { AlbumContext, UserContext } from 'state';
import { ITrack } from 'types/track';

export function AlbumTracks() {
  const { country } = useContext(UserContext);
  const { id: albumID } = useContext(AlbumContext);

  const { tracks, isLoading } = useAlbumTracksWithFollow(albumID, {
    country,
    limit: 50
  });

  return (
    (!isLoading && <AlbumTableTracks tracks={tracks as ITrack[]} />) || (
      <TrackLoadingStack />
    )
  );
}
