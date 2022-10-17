import { AspectRatio, Image } from '@chakra-ui/react';
import { Skeleton } from 'src/components/Skeleton';
import { IArtist } from 'src/types/artist';

interface HomeBannerProps {
  artist: IArtist;
}

export function HomeBanner(props: HomeBannerProps) {
  const { artist } = props;

  return (
    <AspectRatio
      ratio={16 / 9}
      position={'fixed'}
      boxSize={'full'}
      top={0}
      left={0}
      sx={{ imageRendering: 'crisp-edges' }}
      _after={{
        bgGradient:
          'linear(var(--chakra-colors-bg-base), var(--chakra-colors-spotify-500))',
        opacity: 0.92,
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        boxSize: 'full'
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
