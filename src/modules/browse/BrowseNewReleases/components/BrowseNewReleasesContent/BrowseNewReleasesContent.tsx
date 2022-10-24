import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { AlbumGrid } from 'src/modules/album/components';
import { BrowseNewReleasesContext } from 'src/state';

export function BrowseNewReleasesContent() {
  const { albums } = useContext(BrowseNewReleasesContext);

  return <Box>{albums && <AlbumGrid albums={albums} />}</Box>;
}
