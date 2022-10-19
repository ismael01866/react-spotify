import { Heading, HStack, Link } from '@chakra-ui/react';
import { default as NextLink } from 'next/link';
import { ArtistGrid } from 'src/modules/artists/components';
import { useMeTopArtists } from 'src/utils/hooks/services';

export function HomeUserMeTopArtists() {
  const limit = 8;

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
      <ArtistGrid columns={{ base: 1, sm: 2, md: 4 }} artists={data!} />
    </>
  );
}
