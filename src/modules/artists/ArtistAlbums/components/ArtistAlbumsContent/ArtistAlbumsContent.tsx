import { Box } from '@chakra-ui/react';
import { useContext, useRef } from 'react';
import { AlbumGrid } from 'src/modules/albums/components/AlbumGrid';
import { ArtistContext } from 'src/modules/artists/Artist/ArtistContext';
import { useInfiniteScroll } from 'src/utils/hooks';
import { useArtistAlbums } from 'src/utils/hooks/services';

export function ArtistAlbumsContent() {
  const contentEl = useRef<HTMLDivElement>(null);

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

  useInfiniteScroll(contentEl, fetchData);

  // Data fetch

  function fetchData() {
    if (isEmpty || isLoadingMore) return;
    setSize(size + 1);
  }

  return (
    <Box
      overflowY={'scroll'}
      px={12}
      ref={contentEl}
      sx={{
        scrollbarWidth: 'thin'
      }}
    >
      {data && (
        <AlbumGrid
          albums={data}
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        />
      )}
    </Box>
  );
}
