import { Heading, HStack, Link } from '@chakra-ui/react';
import { default as NextLink } from 'next/link';

import { useMeTopArtists } from 'hooks/services';
import { ArtistGrid } from 'modules/artist/components';

export function HomeUserMeTopArtists() {
  const limit = 10;

  const { artists, isLoading } = useMeTopArtists({
    limit
  });

  const skeletonData = new Array(limit).fill('');
  const data = isLoading ? skeletonData : artists;

  return (
    <>
      <HStack justifyContent={'space-between'}>
        <Heading fontSize={'2xl'}>Top artists</Heading>

        <NextLink href={'/users/me/top/artists'}>
          <Link ml={'auto'}>See all</Link>
        </NextLink>
      </HStack>

      <br />
      <ArtistGrid artists={data!} />
    </>
  );
}
