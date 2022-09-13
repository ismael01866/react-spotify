import { Box, Flex, Heading, HStack, Link } from '@chakra-ui/react';
import { default as NextLink } from 'next/link';
import {
  HomeUserMePlayerRecentlyPlayed,
  HomeUserMeTopArtists
} from './components';

export function Home() {
  return (
    <Flex flexDirection={'column'} gap={12}>
      <Box>
        <HStack justifyContent={'space-between'}>
          <Heading fontSize={'2xl'}>Recently played</Heading>

          <NextLink href={'/users/me/player/recently-played'}>
            <Link ml={'auto'}>See all</Link>
          </NextLink>
        </HStack>

        <br />
        <HomeUserMePlayerRecentlyPlayed />
      </Box>

      <Box>
        <HStack justifyContent={'space-between'}>
          <Heading fontSize={'2xl'}>Your top artists</Heading>

          <NextLink href={'/users/me/top/artists'}>
            <Link ml={'auto'}>See all</Link>
          </NextLink>
        </HStack>

        <br />
        <HomeUserMeTopArtists />
      </Box>
    </Flex>
  );
}
