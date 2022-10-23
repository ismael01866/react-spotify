import { Flex, Grid, GridItem, Heading, HStack, Link } from '@chakra-ui/react';
import { default as NextLink } from 'next/link';
import { useContext } from 'react';
import { AlbumContext } from 'src/state';
import { AlbumTracks, ArtistAlbums } from './components';

export function AlbumContent() {
  const album = useContext(AlbumContext);
  const artistID = album?.artists?.[0].id;

  return (
    <Flex flexDirection={'column'}>
      <Grid gridTemplateColumns="repeat(12, 1fr)" gap={{ base: 0, md: 12 }}>
        <GridItem colSpan={{ base: 12, lg: 8 }}>
          <Heading fontSize={'2xl'}>Tracks</Heading>

          <br />
          <AlbumTracks />
        </GridItem>

        <GridItem colSpan={{ base: 12, lg: 4 }}>
          <HStack justifyContent={'space-between'}>
            <Heading fontSize={'2xl'}>More Albums</Heading>

            <NextLink href={`/artists/${artistID}/albums`} passHref>
              <Link ml={'auto'}>See all</Link>
            </NextLink>
          </HStack>

          <br />
          <ArtistAlbums />
        </GridItem>
      </Grid>
    </Flex>
  );
}
