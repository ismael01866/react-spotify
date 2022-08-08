import { AspectRatio, Image, Skeleton } from '@chakra-ui/react';

import { IArtist } from 'src/types/artist';

export interface ArtistAvatarProps {
  artist: IArtist;
  isLoading: boolean;
}

export function ArtistAvatar(props: ArtistAvatarProps) {
  const { artist } = props;

  return (
    <AspectRatio boxSize={'3xs'} ratio={4 / 3}>
      <Image
        src={artist?.images?.[0].url}
        alt={artist.name}
        fallback={<Skeleton />}
      />
    </AspectRatio>
  );
}
