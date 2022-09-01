import { Box } from '@chakra-ui/react';
import { useContext, useEffect, useRef } from 'react';
import { ArtistContext } from 'src/modules/artists/Artist/ArtistContext';
import { ArtistGridAlbums } from 'src/modules/artists/components';
import { useArtistAlbums } from 'src/utils/hooks/services';

export function ArtistAlbums() {
  const { id: artistID } = useContext(ArtistContext);
  const { albums, isLoading, next } = useArtistAlbums(artistID, {
    limit: 50
  });

  const skeletonData = new Array(20).fill('');
  const data = isLoading ? skeletonData : albums;

  // Scroll event

  const contentEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentEl?.current;

    el?.addEventListener('scroll', handleScroll, {
      passive: true
    });

    return () => {
      el?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll: EventListener = (event: Event) => {
    const element = event?.target as HTMLElement;
    const scrollThreshold = 200;

    const scrollReachedBottom =
      element?.scrollHeight - element.scrollTop <=
      element?.clientHeight + scrollThreshold;

    if (scrollReachedBottom) {
      console.log('scrolled');
    }
  };

  return (
    <Box
      overflowY={'scroll'}
      ref={contentEl}
      px={12}
      sx={{
        scrollbarWidth: 'thin'
      }}
    >
      {data && (
        <ArtistGridAlbums
          data={data}
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        />
      )}
    </Box>
  );
}
