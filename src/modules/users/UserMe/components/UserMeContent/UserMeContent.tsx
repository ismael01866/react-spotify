import { Box, Flex, Heading, HStack, Link } from '@chakra-ui/react';
import { default as NextLink } from 'next/link';
import {
  UserMeContentGridTopArtists,
  UserMeContentTableTopTracks
} from './components';

export function UserMeContent() {
  return (
    <Flex flexDirection={'column'} gap={12}>
      <Box>
        <HStack justifyContent={'space-between'}>
          <Heading fontSize={'2xl'}>Top artists</Heading>

          <NextLink href={'/users/me/top/artists'}>
            <Link ml={'auto'}>See all</Link>
          </NextLink>
        </HStack>

        <br />
        <UserMeContentGridTopArtists />
      </Box>

      <Box>
        <HStack justifyContent={'space-between'}>
          <Heading fontSize={'2xl'}>Top tracks</Heading>

          <NextLink href={'/users/me/top/tracks'}>
            <Link ml={'auto'}>See all</Link>
          </NextLink>
        </HStack>

        <br />
        <UserMeContentTableTopTracks />
      </Box>

      {/* <Grid
        gridTemplateColumns="repeat(12, 1fr)"
        gap={{ base: 0, md: 12 }}
      >
        <GridItem colSpan={{ base: 12, lg: 8 }}>
          <Heading fontSize={'2xl'}>Popular Tracks</Heading>

          <br />
          <UserPopularTracks />
        </GridItem>

        <GridItem colSpan={{ base: 12, lg: 4 }}>
          <HStack justifyContent={'space-between'}>
            <Heading fontSize={'2xl'}>Top Albums</Heading>

            <NextLink href={`/artists/${artistID}/albums`}>
              <Link ml={'auto'}>See all</Link>
            </NextLink>
          </HStack>

          <br />
          <UserAlbums />

          <br />
          <br />
          <HStack justifyContent={'space-between'}>
            <Heading fontSize={'2xl'}>Related Users</Heading>

            <NextLink href={`/artists/${artistID}/related-artists`}>
              <Link ml={'auto'}>See all</Link>
            </NextLink>
          </HStack>

          <br />
          <UserRelatedUsers />
        </GridItem>
      </Grid> */}
    </Flex>
  );
}
