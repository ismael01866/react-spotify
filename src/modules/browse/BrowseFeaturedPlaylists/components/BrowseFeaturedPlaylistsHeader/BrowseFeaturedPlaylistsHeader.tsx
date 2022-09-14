import { Box, Heading } from '@chakra-ui/react';
import { useContext } from 'react';

import { BrowseFeaturedPlaylistsContext } from '../../BrowseFeaturedPlaylistsContext';

export function BrowseFeaturedPlaylistsHeader() {
  const { message } = useContext(BrowseFeaturedPlaylistsContext);

  return (
    <Box flexShrink={0} px={12}>
      <Heading fontSize={'3xl'} noOfLines={2}>
        {message}
      </Heading>
    </Box>
  );
}
