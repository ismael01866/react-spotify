import { Heading, HStack, Link } from '@chakra-ui/react';
import { default as NextLink } from 'next/link';
import { ArtistGrid } from 'src/modules/artists/components';
import { useMeTopArtists } from 'src/utils/hooks/services';

export function HomeUserMeTopArtists() {
  const limit = 6;
  const time_range = 'short_term';

  const { artists, isLoading } = useMeTopArtists({ limit, time_range });

  const skeletonData = new Array(limit).fill('');
  const data = isLoading ? skeletonData : artists;

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
        <ArtistGrid artists={data} />
      </>
    )) || <></>
  );
}
