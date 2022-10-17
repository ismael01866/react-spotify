import { AlbumEmptySkeleton } from 'src/modules/albums/components';
import { ArtistEmptySkeleton } from 'src/modules/artists/components';
import { PlaylistEmptySkeleton } from 'src/modules/playlists/components';
import { TrackEmptySkeleton } from 'src/modules/tracks/components';

type CardSpotifyEmptySkeletonProps<T> = {
  type: T;
};

export function CardSpotifyEmptySkeleton<T extends string>(
  props: CardSpotifyEmptySkeletonProps<T>
) {
  const { type } = props;

  if (type === 'album') {
    return <AlbumEmptySkeleton />;
  }

  if (type === 'artist') {
    return <ArtistEmptySkeleton />;
  }

  if (type === 'playlist') {
    return <PlaylistEmptySkeleton />;
  }

  if (type === 'track') {
    return <TrackEmptySkeleton />;
  }

  return <></>;
}