import { Box } from '@chakra-ui/react';
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { ArtistContext } from 'src/modules/artists/Artist/ArtistContext';
import { ArtistGridAlbums } from 'src/modules/artists/components';
import { IAlbum } from 'src/types/album';
import { fetcher } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/utils';

export function ArtistAlbums() {
  const dataLimit = 20;
  const { id: artistID } = useContext(ArtistContext);

  const [albums, setAlbums] = useState<IAlbum[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const skeletonData = new Array(dataLimit).fill('');

  // Data fetching

  const fetchData = useCallback(() => {
    if (isLoading || isFinished) return;

    const url = withQueryParams(
      `/api/spotify/artists/${artistID}/albums`,
      {
        offset: albums.length,
        limit: dataLimit,
        include_groups: ['album', 'single']
      }
    );

    setIsLoading(true);

    return fetcher(url).then((data) => {
      setAlbums((albums) => [...albums, ...data]);
      setIsLoading(false);

      if (!data.length) return setIsFinished(true);
    });
  }, [artistID, albums, isFinished, isLoading]);

  useEffect(() => {
    fetchData();
  }, []);

  // Scroll event

  const contentEl = useRef<HTMLDivElement>(null);

  let oldScrollTop = contentEl?.current?.scrollTop || 0;

  const handleScroll: EventListener = (event: Event) => {
    const element = event?.target as HTMLElement;
    const scrollThreshold = 400;

    const scrollReachedBottom =
      element?.scrollHeight - element.scrollTop <=
      element?.clientHeight + scrollThreshold;

    const scrollDirectionIsDown = oldScrollTop < element.scrollTop;

    if (scrollReachedBottom && scrollDirectionIsDown) {
      fetchData();
    }

    oldScrollTop = element.scrollTop;
  };

  useEffect(() => {
    const el = contentEl?.current;

    el?.addEventListener('scroll', handleScroll, {
      passive: true
    });

    return () => {
      el?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <Box
      overflowY={'scroll'}
      ref={contentEl}
      px={12}
      sx={{
        scrollbarWidth: 'thin'
      }}
    >
      {albums && (
        <ArtistGridAlbums
          data={albums}
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        />
      )}

      {isLoading && (
        <ArtistGridAlbums
          data={skeletonData}
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          mt={4}
        />
      )}
    </Box>
  );
}
