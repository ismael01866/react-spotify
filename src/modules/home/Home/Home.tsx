import { Box, Flex, Heading, HStack, Link } from '@chakra-ui/react';
import { default as NextLink } from 'next/link';
import { FeaturedGridArtists, FeaturedGridTracks } from './components';

export function Home() {
  return (
    <Flex flexDirection={'column'} gap={12}>
      <Box>
        <Heading fontSize={'2xl'}>Your Top Tracks</Heading>

        <br />
        <FeaturedGridTracks
          limit={6}
          columns={{ base: 1, sm: 2, md: 3, lg: 6 }}
        />
      </Box>

      <Box>
        <HStack justifyContent={'space-between'}>
          <Heading fontSize={'2xl'}>Your Top Artists</Heading>

          <NextLink href={'/artists/top'}>
            <Link ml={'auto'}>See all</Link>
          </NextLink>
        </HStack>

        <br />
        <FeaturedGridArtists
          limit={6}
          columns={{ base: 1, sm: 2, md: 3, lg: 6 }}
        />
      </Box>
    </Flex>
  );
}
