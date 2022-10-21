import { AspectRatio, Image } from '@chakra-ui/react';
import { IPlaylist } from 'src/types/playlist';
import { PlaylistEmptySkeleton } from '../PlaylistEmptySkeleton';

interface PlaylistImageProps {
  playlist: IPlaylist;
  [others: string]: any;
}

export function PlaylistImage(props: PlaylistImageProps) {
  const { playlist, ...others } = props;
  const { name, images } = playlist;

  return (
    <AspectRatio boxSize={'full'} ratio={4 / 4} {...others}>
      <Image
        src={images?.[0]?.url}
        alt={name}
        fallback={<PlaylistEmptySkeleton />}
      />
    </AspectRatio>
  );
}
