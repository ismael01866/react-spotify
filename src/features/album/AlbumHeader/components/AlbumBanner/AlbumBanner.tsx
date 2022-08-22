import { AspectRatio, Box } from '@chakra-ui/react';
import { IAlbum } from 'src/types/album';

export interface AlbumBannerProps {
  album: IAlbum;
}

export function AlbumBanner(props: AlbumBannerProps) {
  return (
    <AspectRatio ratio={16 / 9} h={'4xs'}>
      <Box bgColor={'bg.900'} h={'full'} />
    </AspectRatio>
  );
}
