import { AspectRatio, Image, Skeleton } from '@chakra-ui/react';
import { IAlbum } from 'src/types/album';

export interface AlbumAvatarProps {
  album: IAlbum;
}

export function AlbumAvatar(props: AlbumAvatarProps) {
  const { album } = props;

  return (
    <AspectRatio boxSize={'3xs'} ratio={4 / 3}>
      <Image
        src={album?.images?.[0]?.url}
        alt={album.name}
        fallback={<Skeleton startColor={''} />}
      />
    </AspectRatio>
  );
}
