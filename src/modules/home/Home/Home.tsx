import { Box, Flex } from '@chakra-ui/react';
import {
  HomeUserMePlayerRecentlyPlayed,
  HomeUserMeTopArtists
} from './components';
import { HomeBrowseFeaturedPlaylists } from './components/HomeBrowseFeaturedPlaylists';

export function Home() {
  return (
    <Flex flexDirection={'column'} gap={12}>
      <Box>
        <HomeUserMePlayerRecentlyPlayed />
      </Box>

      <Box>
        <HomeBrowseFeaturedPlaylists />
      </Box>

      <Box>
        <HomeUserMeTopArtists />
      </Box>
    </Flex>
  );
}
