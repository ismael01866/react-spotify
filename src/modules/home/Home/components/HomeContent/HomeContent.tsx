import { Box, Flex, Grid, GridItem, VStack } from '@chakra-ui/react';
import {
  HomeBrowseFeaturedPlaylists,
  HomeUserMePlayerRecentlyPlayed,
  HomeUserMeTopArtists
} from './components';

export function HomeContent() {
  return (
    <Flex flexDirection={'column'} gap={12} pos={'relative'}>
      <Grid
        gridTemplateColumns="repeat(12, 1fr)"
        gap={{ base: 0, md: 12 }}
      >
        <GridItem colSpan={{ base: 12, lg: 8 }}>
          <VStack spacing={12}>
            <Box w={'full'}>
              <HomeBrowseFeaturedPlaylists />
            </Box>

            <Box w={'full'}>
              <HomeUserMeTopArtists />
            </Box>

            <Box w={'full'}>
              <HomeUserMePlayerRecentlyPlayed />
            </Box>
          </VStack>
        </GridItem>

        <GridItem colSpan={{ base: 12, lg: 4 }}></GridItem>
      </Grid>
    </Flex>
  );
}
