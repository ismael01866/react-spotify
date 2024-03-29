import { useContext } from 'react';
import { Box, Heading } from '@chakra-ui/react';

import { BrowseFeaturedPlaylistsContext } from 'state';

export function BrowseFeaturedPlaylistsHeader() {
  const { message } = useContext(BrowseFeaturedPlaylistsContext);

  return (
    <Box>
      <Heading fontSize={'3xl'} noOfLines={2}>
        {message}
      </Heading>
    </Box>
  );
}
