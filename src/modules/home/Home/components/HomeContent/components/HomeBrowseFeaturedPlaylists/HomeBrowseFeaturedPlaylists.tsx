import { Heading, HStack, Link } from '@chakra-ui/react';
import { default as NextLink } from 'next/link';
import { useContext } from 'react';
import { PlaylistGrid } from 'src/modules/playlist/components';
import { UserContext } from 'src/state';
import { useBrowseFeaturedPlaylist } from 'src/utils/hooks/services';

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
