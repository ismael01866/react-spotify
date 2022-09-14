import { Heading, HStack, Link } from '@chakra-ui/react';
import { useContext } from 'react';
import { PlaylistGrid } from 'src/modules/playlists/components';
import { UserContext } from 'src/modules/users';
import { useBrowseFeaturedPlaylist } from 'src/utils/hooks/services';

import { default as NextLink } from 'next/link';

export function HomeBrowseFeaturedPlaylists() {
  const { country } = useContext(UserContext);
  const limit = 6;

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
        <PlaylistGrid playlists={data} />
      </>
    )) || <></>
  );
}
