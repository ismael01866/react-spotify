import { AspectRatio, Image } from '@chakra-ui/react';
import { IAlbum } from 'src/types/album';
import { AlbumEmptySkeleton } from '../AlbumEmptySkeleton';

interface AlbumImageProps {
  album: IAlbum;
}

export function AlbumImage(props: AlbumImageProps) {
  const { album } = props;
  const { name, images } = album;

  return (
    <AspectRatio
      borderRadius={'base'}
      boxSize={'full'}
      overflow={'hidden'}
      ratio={4 / 4}
    >
      <Image
        src={images?.[0]?.url}
        alt={name}
        fallback={<AlbumEmptySkeleton />}
      />
    </AspectRatio>
  );
}
