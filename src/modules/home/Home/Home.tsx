import { Box, Flex } from '@chakra-ui/react';
import {
  HomeBrowseFeaturedPlaylists,
  HomeUserMePlayerRecentlyPlayed,
  HomeUserMeTopArtists
} from './components';

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
