import { Box, Heading, Link } from '@chakra-ui/react';
import { useContext } from 'react';
import { ArtistContext } from 'src/modules/artists/Artist/ArtistContext';

import { default as NextLink } from 'next/link';

export function ArtistAlbumsHeader() {
  const artist = useContext(ArtistContext);
  const { id, name } = artist;

  return (
    <Box>
      <Heading fontSize={'3xl'} noOfLines={2}>
        <NextLink href={`/artists/${id}`} passHref>
          <Link>{name}</Link>
        </NextLink>
      </Heading>
    </Box>
  );
}
