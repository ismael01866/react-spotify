import { AspectRatio, Image, Skeleton } from '@chakra-ui/react';

import { IArtist } from 'src/types/artist';

export interface ArtistBannerProps {
  artist: IArtist;
}

export function ArtistBanner(props: ArtistBannerProps) {
  const { artist } = props;

  return (
    <AspectRatio
      ratio={16 / 9}
      h={'3xs'}
      overflow={'hidden'}
      _after={{
        bgColor: 'blackAlpha.800',
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        h: 'full',
        w: 'full'
      }}
    >
      <Image
        src={artist?.images?.[0].url}
        alt={artist.name}
        fallback={<Skeleton />}
      />
    </AspectRatio>
  );
}
