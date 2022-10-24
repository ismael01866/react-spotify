import { Box, Flex } from '@chakra-ui/react';

import { HomeBrowseNewReleases } from './components/HomeBrowseNewReleases';
import {
  HomeBrowseFeaturedPlaylists,
  HomeUserMeTopArtists
} from './components';

export function HomeContent() {
  return (
    <Flex flexDirection={'column'} gap={12}>
      <Box>
        <HomeBrowseFeaturedPlaylists />
      </Box>

      <Box>
        <HomeUserMeTopArtists />
      </Box>

      <Box>
        <HomeBrowseNewReleases />
      </Box>
    </Flex>
  );
}
