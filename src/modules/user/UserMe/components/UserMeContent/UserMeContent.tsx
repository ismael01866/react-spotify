import { Box, Flex, Heading, HStack, Link } from '@chakra-ui/react';
import { default as NextLink } from 'next/link';
import {
  UserMeContentGridTopArtists,
  UserMeContentTableTopTracks
} from './components';
import { UserMeContentGridPlaylists } from './components/UserMeContentGridPlaylists';

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

      <Box>
        <HStack justifyContent={'space-between'}>
          <Heading fontSize={'2xl'}>Public playlists</Heading>
        </HStack>

        <br />
        <UserMeContentGridPlaylists />
      </Box>
    </Flex>
  );
}
