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
import { ArtistGridAlbums } from 'src/modules/artists/components';
import { AlbumContext } from '../../AlbumContext';
import { AlbumTracks } from './components';

export function AlbumContent() {
  const album = useContext(AlbumContext);
  const artistID = album?.artists?.[0].id;

  return (
    <Flex flexDirection={'column'}>
      <Grid
        gridTemplateColumns="repeat(12, 1fr)"
        gap={{ base: 0, md: 12 }}
      >
        <GridItem colSpan={{ base: 12, lg: 8 }}>
          <Heading fontSize={'2xl'}>Tracks</Heading>

          <br />
          <AlbumTracks />
        </GridItem>

        <GridItem colSpan={{ base: 12, lg: 4 }}>
          <HStack justifyContent={'space-between'}>
            <Heading fontSize={'2xl'}>More Albums</Heading>

            <NextLink href={`#`}>
              <Link ml={'auto'}>See all</Link>
            </NextLink>
          </HStack>

          <br />
          {artistID && (
            <ArtistGridAlbums
              artistID={artistID}
              limit={6}
              columns={{ base: 1, sm: 2, xl: 3 }}
            />
          )}
        </GridItem>
      </Grid>
    </Flex>
  );
}
