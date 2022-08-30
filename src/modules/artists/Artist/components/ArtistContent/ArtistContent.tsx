import {
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Link
} from '@chakra-ui/react';
import { default as NextLink } from 'next/link';
import { useContext } from 'react';
import { ArtistContext } from '../../ArtistContext';
import { ArtistPopularTracks } from './components';
import { ArtistAlbums } from './components/ArtistAlbums';
import { ArtistRelatedArtists } from './components/ArtistRelatedArtists';

export function ArtistContent() {
  const { id: artistID } = useContext(ArtistContext);

  return (
    <Flex flexDirection={'column'}>
      <Grid
        gridTemplateColumns="repeat(12, 1fr)"
        gap={{ base: 0, md: 12 }}
      >
        <GridItem colSpan={{ base: 12, lg: 8 }}>
          <Heading fontSize={'2xl'}>Popular Tracks</Heading>

          <br />
          <ArtistPopularTracks />
        </GridItem>

        <GridItem colSpan={{ base: 12, lg: 4 }}>
          <HStack justifyContent={'space-between'}>
            <Heading fontSize={'2xl'}>Top Albums</Heading>

            <NextLink href={`/artists/${artistID}/albums`}>
              <Link ml={'auto'}>See all</Link>
            </NextLink>
          </HStack>

          <br />
          <ArtistAlbums />

          <br />
          <br />
          <HStack justifyContent={'space-between'}>
            <Heading fontSize={'2xl'}>Related Artists</Heading>

            <NextLink href={`#`}>
              <Link ml={'auto'}>See all</Link>
            </NextLink>
          </HStack>

          <br />
          <ArtistRelatedArtists />
        </GridItem>
      </Grid>
    </Flex>
  );
}
