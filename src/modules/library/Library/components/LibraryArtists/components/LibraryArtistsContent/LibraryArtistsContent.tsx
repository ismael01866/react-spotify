import { Box } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { ArtistGrid } from 'src/modules/artists/components/ArtistGrid';
import { IArtist } from 'src/types/artist';
import { fetcher } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';
import { useInfiniteScroll } from 'src/utils/hooks';

export function LibraryArtistsContent() {
  const [artists, setArtists] = useState<IArtist[]>([]);

  const contentEl = useRef<HTMLDivElement>(null);

  const [after, setAfter] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInfiniteScroll(contentEl, fetchData);

  // Data fetch

  function fetchData() {
    if (isLoading || isFinished) return;

    const url = withQueryParams(`/api/spotify/me/following`, {
      after,
      type: 'artist',
      limit: 50
    });

    setIsLoading(true);

    return fetcher(url)
      .then((data) => {
        const { items, total, after } = data;
        if (!artists.length >= total) return setIsFinished(true);

        setAfter(after);
        setArtists((artists) => [...artists, ...items]);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
      {artists && (
        <ArtistGrid
          artists={artists}
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        />
      )}
    </Box>
  );
}
