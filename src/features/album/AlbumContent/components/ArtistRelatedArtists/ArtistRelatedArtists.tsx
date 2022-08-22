import { Heading, HStack, Link } from '@chakra-ui/react';
import { default as NextLink } from 'next/link';
import { ArtistGridRelatedArtists } from './components';

export function ArtistRelatedArtists() {
  // const { artistID } = useContext(ArtistContext);

  return (
    <>
      <HStack justifyContent={'space-between'}>
        <Heading fontSize={'2xl'}>Related Artists</Heading>

        <NextLink href={`#`}>
          <Link ml={'auto'}>See all</Link>
        </NextLink>
      </HStack>

      <br />
      <ArtistGridRelatedArtists
        limit={3}
        columns={{ base: 1, sm: 2, xl: 3 }}
      />
    </>
  );
}
