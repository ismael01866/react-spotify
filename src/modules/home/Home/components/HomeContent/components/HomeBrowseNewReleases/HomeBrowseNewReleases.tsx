import { useContext } from 'react';
import { Heading, HStack, Link } from '@chakra-ui/react';
import { default as NextLink } from 'next/link';

import { useBrowseNewReleases } from 'hooks/services';
import { AlbumGrid } from 'modules/album/components';
import { UserContext } from 'state';

export function HomeBrowseNewReleases() {
  const { country } = useContext(UserContext);
  const limit = 10;

  const { albums, isLoading } = useBrowseNewReleases({
    limit,
    country
  });

  const skeletonData = new Array(limit).fill('');
  const data = isLoading ? skeletonData : albums;

  return (
    <>
      <HStack justifyContent={'space-between'}>
        <Heading fontSize={'2xl'}>New Releases</Heading>

        <NextLink href={'/browse/new-releases'}>
          <Link ml={'auto'}>See all</Link>
        </NextLink>
      </HStack>

      <br />
      <AlbumGrid albums={data!} />
    </>
  );
}
