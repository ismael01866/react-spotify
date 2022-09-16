import { Heading, HStack, Link } from '@chakra-ui/react';
import { default as NextLink } from 'next/link';
import { TrackGrid } from 'src/modules/tracks/components';
import { useMePlayerRecentlyPlayed } from 'src/utils/hooks/services';

export function HomeUserMePlayerRecentlyPlayed() {
  const limit = 6;

  const { tracks, isLoading } = useMePlayerRecentlyPlayed({
    limit
  });

  const skeletonData = new Array(limit).fill('');
  const data = isLoading ? skeletonData : tracks;

  return (
    (data && (
      <>
        <HStack justifyContent={'space-between'}>
          <Heading fontSize={'2xl'}>Recently played</Heading>

          <NextLink href={'/users/me/player/recently-played'}>
            <Link ml={'auto'}>See all</Link>
          </NextLink>
        </HStack>

        <br />
        <TrackGrid tracks={data} />
      </>
    )) || <></>
  );
}
