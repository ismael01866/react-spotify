import { AspectRatio, Image } from '@chakra-ui/react';
import { useCallback } from 'react';
import { ITrack } from 'src/types/track';
import { TrackEmptySkeleton } from '../TrackEmptySkeleton';

export interface TrackImageProps {
  track: ITrack;
  [others: string]: any;
}

export function TrackImage(props: TrackImageProps) {
  const { track, ...others } = props;
  const { name, album, playlist, artists } = track;

  const getImageByContext = useCallback(
    (track: ITrack) => {
      if (!track.context) return;

      const {
        context: { type }
      } = track;

      switch (type) {
        case 'track':
        case 'album':
          return album?.images?.[0]?.url;

        case 'playlist':
          return playlist?.images?.[0]?.url;

        case 'artist':
          return (artists?.[0] as SpotifyApi.ArtistObjectFull)?.images?.[0]
            ?.url;

        default:
          break;
      }
    },
    [album, artists, playlist]
  );

  return (
    <AspectRatio boxSize={'full'} ratio={4 / 4} {...others}>
      <Image
        src={getImageByContext(track)}
        alt={name}
        fallback={<TrackEmptySkeleton />}
      />
    </AspectRatio>
  );
}
