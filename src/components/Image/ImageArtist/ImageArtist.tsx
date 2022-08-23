import { AspectRatio, Image } from '@chakra-ui/react';
import { EmptySkeletonArtist } from 'src/components/Skeleton';
import { IArtist } from 'src/types/artist';

export interface CardArtistProps {
  artist: IArtist;
}

export function ImageArtist(props: CardArtistProps) {
  const { artist } = props;
  const { name, images } = artist;

  return (
    <AspectRatio boxSize={'full'} ratio={4 / 3}>
      <Image
        src={images?.[0]?.url}
        alt={name}
        fallback={<EmptySkeletonArtist />}
      />
    </AspectRatio>
  );
}
