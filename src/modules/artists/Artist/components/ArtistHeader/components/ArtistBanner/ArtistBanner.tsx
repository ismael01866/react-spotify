import { AspectRatio, Image } from '@chakra-ui/react';
import { Skeleton } from 'src/components/Skeleton';
import { IArtist } from 'src/types/artist';

interface ArtistBannerProps {
  artist: IArtist;
}

export function ArtistBanner(props: ArtistBannerProps) {
  const { artist } = props;

  return (
    <AspectRatio
      ratio={16 / 9}
      h={'4xs'}
      overflow={'hidden'}
      _after={{
        bgColor: 'blackAlpha.800',
        boxSize: 'full',
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0
      }}
    >
      <Image
        src={artist?.images?.[0]?.url}
        alt={artist.name}
        fallback={<Skeleton startColor={''} />}
      />
    </AspectRatio>
  );
}
