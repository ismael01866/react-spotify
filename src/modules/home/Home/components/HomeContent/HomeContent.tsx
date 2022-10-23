import { Box, Flex } from '@chakra-ui/react';
import {
  HomeBrowseFeaturedPlaylists,
  HomeUserMeTopArtists
} from './components';
import { HomeBrowseNewReleases } from './components/HomeBrowseNewReleases';

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
