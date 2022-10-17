import { AspectRatio, Image } from '@chakra-ui/react';
import { IArtist } from 'src/types/artist';
import { ArtistEmptySkeleton } from '../ArtistEmptySkeleton';

interface ArtistImageProps {
  artist: IArtist;
}

export function ArtistImage(props: ArtistImageProps) {
  const { artist } = props;
  const { name, images } = artist;

  return (
    <AspectRatio boxSize={'full'} overflow={'hidden'} ratio={4 / 4}>
      <Image
        src={images?.[0]?.url}
        alt={name}
        fallback={<ArtistEmptySkeleton />}
      />
    </AspectRatio>
  );
}
