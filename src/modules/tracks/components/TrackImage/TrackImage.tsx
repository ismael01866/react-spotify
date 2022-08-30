import { AspectRatio, Image } from '@chakra-ui/react';
import { ITrack } from 'src/types/track';
import { TrackEmptySkeleton } from '../TrackEmptySkeleton';

export interface TrackImageProps {
  track: ITrack;
}

export function TrackImage(props: TrackImageProps) {
  const { track } = props;
  const { name, album } = track;

  return (
    <AspectRatio boxSize={'full'} ratio={4 / 3}>
      <Image
        src={album?.images?.[0]?.url}
        alt={name}
        fallback={<TrackEmptySkeleton />}
      />
    </AspectRatio>
  );
}
