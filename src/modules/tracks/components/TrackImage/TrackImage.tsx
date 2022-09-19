import { AspectRatio, Image } from '@chakra-ui/react';
import { useCallback } from 'react';
import { ITrack } from 'src/types/track';
import { TrackEmptySkeleton } from '../TrackEmptySkeleton';

export interface TrackImageProps {
  track: ITrack;
}

export function TrackImage(props: TrackImageProps) {
  const { track } = props;
  const { name, album, playlist, artists } = track;

  const getImageByContext = useCallback((track: ITrack) => {
    if (!track.context) return;

    const {
      context: { type }
    } = track;

    switch (type) {
      case 'track':
      case 'album':
        return album?.images?.[0]?.url;

      case 'artist':
        return artists?.[0]?.images?.[0]?.url;

      case 'playlist':
        return playlist?.images?.[0]?.url;

      default:
        break;
    }
  }, []);

  return (
    <AspectRatio boxSize={'full'} ratio={4 / 3}>
      <Image
        src={getImageByContext(track)}
        alt={name}
        fallback={<TrackEmptySkeleton />}
      />
    </AspectRatio>
  );
}
