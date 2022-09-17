import { Box } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { AlbumGrid } from 'src/modules/albums/components/AlbumGrid';
import { ArtistContext } from 'src/modules/artists/Artist/ArtistContext';
import { IAlbum } from 'src/types/album';
import { fetcher } from 'src/utils/fetch';
import { useInfiniteScroll } from 'src/utils/hooks';
import { withQueryParams } from 'src/utils/helpers';

export function ArtistAlbumsContent() {
  const contentEl = useRef<HTMLDivElement>(null);

  const { id: artistID } = useContext(ArtistContext);

  const [albums, setAlbums] = useState<IAlbum[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const skeletonData = new Array(20).fill('');
  const data = !albums.length ? skeletonData : albums;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInfiniteScroll(contentEl, fetchData);

  // Data fetch

  function fetchData() {
    if (isLoading || isFinished) return;

    const url = withQueryParams(
      `/api/spotify/artists/${artistID}/albums`,
      {
        offset: albums.length,
        limit: 50,
        include_groups: ['album', 'single']
      }
    );

    setIsLoading(true);

    return fetcher(url)
      .then((data) => {
        if (!data.length) return setIsFinished(true);
        setAlbums((albums) => [...albums, ...data]);
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
      {data && (
        <AlbumGrid
          albums={data}
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        />
      )}
    </Box>
  );
}
