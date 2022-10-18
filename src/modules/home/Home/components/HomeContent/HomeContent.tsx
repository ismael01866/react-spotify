import { Flex, Grid, GridItem } from '@chakra-ui/react';
import {
  HomeBrowseFeaturedPlaylists
  // HomeUserMeTopArtists
} from './components';

export function HomeContent() {
  return (
    <Flex flexDirection={'column'} gap={12} pos={'relative'}>
      <Grid
        gridTemplateColumns="repeat(12, 1fr)"
        gap={{ base: 0, md: 12 }}
      >
        <GridItem colSpan={{ base: 12, lg: 6 }}>
          <HomeBrowseFeaturedPlaylists />
        </GridItem>

        <GridItem colSpan={{ base: 12, lg: 2 }}>
          {/* <HomeUserMeTopArtists /> */}
        </GridItem>

        <GridItem colSpan={{ base: 12, lg: 4 }}>
          {/* <HomeUserMeTopArtists /> */}
        </GridItem>
      </Grid>
    </Flex>
  );
}
