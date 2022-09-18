import { Heading, HStack, Link } from '@chakra-ui/react';
import { default as NextLink } from 'next/link';
import { useContext } from 'react';
import { ArtistGrid } from 'src/modules/artists/components';
import { HomeContext } from '../../HomeContext';

export function HomeUserMeTopArtists() {
  const skeletonData = new Array(6).fill('');
  const { topArtists } = useContext(HomeContext);

  const data = topArtists || skeletonData;

  return (
    (data && (
      <>
        <HStack justifyContent={'space-between'}>
          <Heading fontSize={'2xl'}>Top artists</Heading>

          <NextLink href={'/users/me/top/artists'}>
            <Link ml={'auto'}>See all</Link>
          </NextLink>
        </HStack>

        <br />
        <ArtistGrid artists={data} />
      </>
    )) || <></>
  );
}
