import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { ArtistAlbums } from './components/ArtistAlbums';
import { ArtistPopularTracks } from './components/ArtistPopularTracks/ArtistPopularTracks';

export function ArtistContent() {
  return (
    <Flex flexDirection={'column'}>
      <Grid
        gridTemplateColumns="repeat(12, 1fr)"
        gap={{ base: 0, md: 12 }}
      >
        <GridItem colSpan={{ base: 12, md: 6, lg: 8 }}>
          <ArtistPopularTracks />
        </GridItem>

        <GridItem
          className={'popo'}
          colSpan={{ base: 12, md: 6, lg: 4 }}
        >
          <ArtistAlbums />
        </GridItem>
      </Grid>
    </Flex>
  );
}
