import { AspectRatio, Image } from '@chakra-ui/react';
import { EmptySkeletonAlbum } from 'src/components/Skeleton';
import { IAlbum } from 'src/types/album';

export interface CardAlbumProps {
  album: IAlbum;
}

export function ImageAlbum(props: CardAlbumProps) {
  const { album } = props;
  const { name, images } = album;

  return (
    <AspectRatio boxSize={'full'} ratio={4 / 3}>
      <Image
        src={images?.[0]?.url}
        alt={name}
        fallback={<EmptySkeletonAlbum />}
      />
    </AspectRatio>
  );
}