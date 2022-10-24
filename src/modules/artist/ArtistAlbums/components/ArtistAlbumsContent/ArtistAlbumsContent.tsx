import { useContext } from 'react';
import { Box } from '@chakra-ui/react';
import { LayoutGridContext } from 'layout/components/LayoutGrid/LayoutGridContext';

import { useInfiniteScroll } from 'hooks/dom';
import { useArtistAlbums } from 'hooks/services';
import { AlbumGrid } from 'modules/album/components';
import { ArtistContext } from 'state';

export function ArtistAlbumsContent() {
  const { contentElRef } = useContext(LayoutGridContext);
  const { id: artistID } = useContext(ArtistContext);

  const {
    albums,
    size,
    setSize,
    isEmpty,
    isLoadingMore,
    isLoadingInitialData
  } = useArtistAlbums(artistID, {
    limit: 50,
    include_groups: ['album', 'single']
  });

  const skeletonData = new Array(20).fill('');
  const data = isLoadingInitialData ? skeletonData : albums;

  useInfiniteScroll(contentElRef, fetchData);

  // Data fetch

  function fetchData() {
    if (isEmpty || isLoadingMore) return;
    setSize(size + 1);
  }

  return (
    <Box>
      {data && (
        <AlbumGrid
          albums={data}
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        />
      )}
    </Box>
  );
}
