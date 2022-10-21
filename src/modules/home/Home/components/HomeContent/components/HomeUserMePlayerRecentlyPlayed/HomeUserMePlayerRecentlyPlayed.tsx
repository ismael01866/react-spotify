import { Heading, HStack, Link } from '@chakra-ui/react';
import { default as NextLink } from 'next/link';
import { TrackGrid } from 'src/modules/track/components';
import { useMePlayerRecentlyPlayed } from 'src/utils/hooks/services';

export function HomeUserMePlayerRecentlyPlayed() {
  const limit = 8;

  const { tracks, isLoading } = useMePlayerRecentlyPlayed({
    limit
  });

  const skeletonData = new Array(limit).fill('');
  const data = isLoading ? skeletonData : tracks;

  return (
    <>
      <HStack justifyContent={'space-between'}>
        <Heading fontSize={'2xl'}>Recently played</Heading>

        <NextLink href={'/users/me/player/recently-played'}>
          <Link ml={'auto'}>See all</Link>
        </NextLink>
      </HStack>

      <br />
      <TrackGrid columns={{ base: 1, sm: 2, md: 4 }} tracks={data!} />
    </>
  );
}
