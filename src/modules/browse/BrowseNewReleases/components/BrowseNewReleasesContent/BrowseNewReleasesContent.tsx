import { useContext } from 'react';
import { Box } from '@chakra-ui/react';

import { AlbumGrid } from 'modules/album/components';
import { BrowseNewReleasesContext } from 'state';

export function BrowseNewReleasesContent() {
  const { albums } = useContext(BrowseNewReleasesContext);

  return <Box>{albums && <AlbumGrid albums={albums} />}</Box>;
}
