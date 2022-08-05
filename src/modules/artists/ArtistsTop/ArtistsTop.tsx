import { Layout } from 'layout';

import { Box, Heading } from '@chakra-ui/react';

import { FeaturedGridArtists } from 'src/features/playlists';
import { useTopArtists } from 'src/lib/hooks/services';

export function ArtistsTop() {
  const skeletonArtists = new Array(12).fill('');

  const { artists, isLoading } = useTopArtists(skeletonArtists, {
    method: 'POST',
    body: JSON.stringify({ limit: 20 })
  });

  return (
    <Layout>
      <Box p={12}>
        <Heading fontSize={'2xl'}>Your Top Artists</Heading>

        <br />
        <FeaturedGridArtists artists={artists} isLoading={isLoading} />
      </Box>
    </Layout>
  );
}
