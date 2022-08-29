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
import { ArtistContext } from 'src/features/artist';
import { ArtistGridAlbums } from 'src/features/artist/ArtistContent/components/ArtistAlbums/components';
import { useAlbum } from 'src/lib/hooks/services';
import { AlbumContext } from '../AlbumContext';
import { AlbumTracks } from './components';

export function AlbumContent() {
  const { albumID } = useContext(AlbumContext);
  const { album = {} } = useAlbum(albumID);

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
            <ArtistContext.Provider value={{ artistID }}>
              <ArtistGridAlbums
                limit={6}
                columns={{ base: 1, sm: 2, md: 3 }}
              />
            </ArtistContext.Provider>
          )}
        </GridItem>
      </Grid>
    </Flex>
  );
}
