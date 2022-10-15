import { AlbumImage } from 'src/modules/albums/components';
import { ArtistImage } from 'src/modules/artists/components';
import { PlaylistImage } from 'src/modules/playlists/components';
import { TrackImage } from 'src/modules/tracks/components';

export interface CardSpotifyImageProps<TData, TType> {
  data: TData;
  type: TType;
}

export function CardSpotifyImage<
  TData extends {},
  TType extends string
>(props: CardSpotifyImageProps<TData, TType>) {
  const { type, data } = props;

  if (type === 'album') {
    return <AlbumImage album={data} />;
  }

  if (type === 'artist') {
    return <ArtistImage artist={data} />;
  }

  if (type === 'playlist') {
    return <PlaylistImage playlist={data} />;
  }

  if (type === 'track') {
    return <TrackImage track={data} />;
  }

  return <></>;
}
