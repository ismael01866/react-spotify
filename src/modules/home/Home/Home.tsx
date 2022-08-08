import { Layout } from 'layout';

import { Box, Heading, HStack, Link } from '@chakra-ui/react';
import { default as NextLink } from 'next/link';

import {
  FeaturedGridArtists,
  FeaturedGridTracks
} from 'src/features/playlists';

import { useTopArtists } from 'src/lib/hooks/services';

export function Home() {
  const skeletonArtists = new Array(12).fill('');

  const { artists, isLoading } = useTopArtists(skeletonArtists, {
    method: 'POST',
    body: JSON.stringify({ limit: 12 })
  });

  return (
    <Layout>
      <Box p={12}>
        <Heading fontSize={'2xl'}>Your Top Tracks</Heading>

        <br />
        <FeaturedGridTracks />
      </Box>

      <Box p={12}>
        <HStack justifyContent={'space-between'}>
          <Heading fontSize={'2xl'}>Your Top Artists</Heading>

          <NextLink href={'/artists/top'}>
            <Link ml={'auto'}>See all</Link>
          </NextLink>
        </HStack>

        <br />
        <FeaturedGridArtists artists={artists} isLoading={isLoading} />
      </Box>
    </Layout>
  );
}
