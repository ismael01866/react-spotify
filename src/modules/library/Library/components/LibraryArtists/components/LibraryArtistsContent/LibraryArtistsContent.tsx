import { Box } from '@chakra-ui/react';
import { useRef } from 'react';
import { ArtistGrid } from 'src/modules/artists/components/ArtistGrid';
import { useInfiniteScroll } from 'src/utils/hooks';
import { useMeArtists } from 'src/utils/hooks/services';

export function LibraryArtistsContent() {
  const contentEl = useRef<HTMLDivElement>(null);

  const {
    artists,
    size,
    setSize,
    isEmpty,
    isLoadingMore,
    isLoadingInitialData
  } = useMeArtists({ limit: 50 });

  const skeletonData = new Array(20).fill('');
  const data = isLoadingInitialData ? skeletonData : artists;

  useInfiniteScroll(contentEl, fetchData);

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
        <ArtistGrid
          artists={data}
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        />
      )}
    </Box>
  );
}
