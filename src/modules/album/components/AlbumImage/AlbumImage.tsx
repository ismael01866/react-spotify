import { AspectRatio, Image } from '@chakra-ui/react';
import { IAlbum } from 'src/types/album';
import { AlbumEmptySkeleton } from '../AlbumEmptySkeleton';

interface AlbumImageProps {
  album: IAlbum;
  [others: string]: any;
}

export function AlbumImage(props: AlbumImageProps) {
  const { album, ...others } = props;
  const { name, images } = album;

  return (
    <AspectRatio boxSize={'full'} ratio={4 / 4} {...others}>
      <Image
        src={images?.[0]?.url}
        alt={name}
        fallback={<AlbumEmptySkeleton />}
      />
    </AspectRatio>
  );
}
