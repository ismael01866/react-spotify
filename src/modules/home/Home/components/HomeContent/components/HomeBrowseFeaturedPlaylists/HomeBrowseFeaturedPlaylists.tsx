import { useContext } from 'react';
import { Heading, HStack, Link } from '@chakra-ui/react';
import { default as NextLink } from 'next/link';

import { useBrowseFeaturedPlaylist } from 'hooks/services';
import { PlaylistGrid } from 'modules/playlist/components';
import { UserContext } from 'state';

export function HomeBrowseFeaturedPlaylists() {
  const { country } = useContext(UserContext);
  const limit = 10;

  const {
    data: { message, playlists },
    isLoading
  } = useBrowseFeaturedPlaylist({
    limit,
    country
  });

  const skeletonData = new Array(limit).fill('');
  const data = isLoading ? skeletonData : playlists;

  return (
    <>
      <HStack justifyContent={'space-between'}>
        <Heading fontSize={'2xl'}>{message}</Heading>

        <NextLink href={'/browse/featured-playlists'}>
          <Link ml={'auto'}>See all</Link>
        </NextLink>
      </HStack>

      <br />
      <PlaylistGrid playlists={data!} />
    </>
  );
}
