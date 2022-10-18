import { Heading, HStack, Link } from '@chakra-ui/react';
import { useContext } from 'react';
import { PlaylistGrid } from 'src/modules/playlists/components';
import { useBrowseFeaturedPlaylist } from 'src/utils/hooks/services';

import { default as NextLink } from 'next/link';
import { UserContext } from 'src/modules/users/User/UserContext';

export function HomeBrowseFeaturedPlaylists() {
  const { country } = useContext(UserContext);
  const limit = 8;

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
    (data && (
      <>
        <HStack justifyContent={'space-between'}>
          <Heading fontSize={'2xl'}>{message}</Heading>

          <NextLink href={'/browse/featured-playlists'}>
            <Link ml={'auto'}>See all</Link>
          </NextLink>
        </HStack>

        <br />
        <PlaylistGrid
          columns={{ base: 1, sm: 2, md: 4 }}
          playlists={data}
        />
      </>
    )) || <></>
  );
}
