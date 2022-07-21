import { Box, Heading } from '@chakra-ui/react';
import { Layout } from 'layout';

import { FeaturedGrid } from 'src/features/playlists';

export function Home() {
  return (
    <Layout>
      <Box p={12}>
        <Heading fontSize={'2xl'}>Your Top Artists</Heading>

        <br />
        <FeaturedGrid />
      </Box>
    </Layout>
  );
}
