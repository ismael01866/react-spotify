import { AspectRatio, AspectRatioProps, Image } from '@chakra-ui/react';
import { IArtist } from 'src/types/artist';
import { ArtistEmptySkeleton } from '../ArtistEmptySkeleton';

interface ArtistImageProps extends AspectRatioProps {
  artist: IArtist;
  [others: string]: any;
}

export function ArtistImage(props: ArtistImageProps) {
  const { artist, ...others } = props;
  const { name, images } = artist;

  return (
    <AspectRatio ratio={4 / 4} {...others}>
      <Image
        src={images?.[0]?.url}
        alt={name}
        fallback={<ArtistEmptySkeleton />}
      />
    </AspectRatio>
  );
}
