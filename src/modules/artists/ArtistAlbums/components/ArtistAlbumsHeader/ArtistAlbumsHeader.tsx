import { Heading, Link } from '@chakra-ui/react';
import { useContext } from 'react';
import { ArtistContext } from 'src/modules/artists/Artist/ArtistContext';

import { default as NextLink } from 'next/link';

export function ArtistAlbumsHeader() {
  const artist = useContext(ArtistContext);

  return (
    <Heading noOfLines={2}>
      <NextLink href={`/artists/${artist.id}`} passHref>
        <Link>{artist.name}</Link>
      </NextLink>
    </Heading>
  );
}
