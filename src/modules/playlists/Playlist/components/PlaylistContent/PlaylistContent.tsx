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
import { PlaylistContext } from '../../PlaylistContext';
import { PlaylistTracks, ArtistPlaylists } from './components';

export function PlaylistContent() {
  const album = useContext(PlaylistContext);
  const playlistID = album?.playlists?.[0].id;

  return (
    <Flex flexDirection={'column'}>
      <Grid
        gridTemplateColumns="repeat(12, 1fr)"
        gap={{ base: 0, md: 12 }}
      >
        <GridItem colSpan={{ base: 12, lg: 8 }}>
          <Heading fontSize={'2xl'}>Tracks</Heading>

          <br />
          <PlaylistTracks />
        </GridItem>

        <GridItem colSpan={{ base: 12, lg: 4 }}>
          <HStack justifyContent={'space-between'}>
            <Heading fontSize={'2xl'}>More Playlists</Heading>

            <NextLink href={`/playlists/${playlistID}/albums`} passHref>
              <Link ml={'auto'}>See all</Link>
            </NextLink>
          </HStack>

          <br />
          <ArtistPlaylists />
        </GridItem>
      </Grid>
    </Flex>
  );
}
