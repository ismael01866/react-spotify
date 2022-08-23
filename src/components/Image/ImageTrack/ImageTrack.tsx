import { AspectRatio, Image } from '@chakra-ui/react';
import { EmptySkeletonTrack } from 'src/components/Skeleton';
import { ITrack } from 'src/types/track';

export interface CardTrackProps {
  track: ITrack;
}

export function ImageTrack(props: CardTrackProps) {
  const { track } = props;
  const { name, album } = track;

  return (
    <AspectRatio boxSize={'full'} ratio={4 / 3}>
      <Image
        src={album?.images?.[0]?.url}
        alt={name}
        fallback={<EmptySkeletonTrack />}
      />
    </AspectRatio>
  );
}
