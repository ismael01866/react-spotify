import { AspectRatio, Image } from '@chakra-ui/react';
import { IPlaylist } from 'src/types/playlist';
import { PlaylistEmptySkeleton } from '../PlaylistEmptySkeleton';

export interface PlaylistImageProps {
  playlist: IPlaylist;
}

export function PlaylistImage(props: PlaylistImageProps) {
  const { playlist } = props;
  const { name, images } = playlist;

  return (
    <AspectRatio boxSize={'full'} ratio={4 / 3}>
      <Image
        src={images?.[0]?.url}
        alt={name}
        fallback={<PlaylistEmptySkeleton />}
      />
    </AspectRatio>
  );
}
