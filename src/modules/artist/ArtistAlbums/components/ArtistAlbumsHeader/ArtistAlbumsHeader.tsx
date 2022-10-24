import { useContext } from 'react';
import { Box, Heading, Link } from '@chakra-ui/react';
import { default as NextLink } from 'next/link';

import { ArtistContext } from 'state';

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
