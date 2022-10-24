import { AlbumEmptySkeleton } from 'modules/album/components';
import { ArtistEmptySkeleton } from 'modules/artist/components';
import { PlaylistEmptySkeleton } from 'modules/playlist/components';
import { TrackEmptySkeleton } from 'modules/track/components';

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
