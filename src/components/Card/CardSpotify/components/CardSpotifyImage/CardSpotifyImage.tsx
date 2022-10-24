import { ImageProps } from '@chakra-ui/react';

import { AlbumImage } from 'modules/album/components';
import { ArtistImage } from 'modules/artist/components';
import { PlaylistImage } from 'modules/playlist/components';
import { TrackImage } from 'modules/track/components';

export interface CardSpotifyImageProps<TData, TType> extends ImageProps {
  data: TData;
  type: TType;
}

export function CardSpotifyImage<TData extends {}, TType extends string>(
  props: CardSpotifyImageProps<TData, TType>
) {
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
