import { AspectRatio, Image } from '@chakra-ui/react';
import { IPlaylist } from 'src/types/playlist';
import { PlaylistEmptySkeleton } from '../PlaylistEmptySkeleton';

interface PlaylistImageProps {
  playlist: IPlaylist;
}

export function PlaylistImage(props: PlaylistImageProps) {
  const { playlist } = props;
  const { name, images } = playlist;

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
        fallback={<PlaylistEmptySkeleton />}
      />
    </AspectRatio>
  );
}
