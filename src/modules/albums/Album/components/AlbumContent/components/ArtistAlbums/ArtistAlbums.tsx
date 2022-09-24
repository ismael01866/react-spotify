import { Heading } from '@chakra-ui/react';
import { useContext } from 'react';
import { AlbumContext } from 'src/modules/albums/Album/AlbumContext';
import { AlbumGrid } from 'src/modules/albums/components';
import { useArtistAlbums } from 'src/utils/hooks/services';

export function ArtistAlbums() {
  const album = useContext(AlbumContext);
  const artistID = album?.artists?.[0].id;

  const { albums, isLoadingInitialData: isLoading } = useArtistAlbums(
    artistID,
    {
      limit: 6,
      include_groups: 'album'
    }
  );

  const skeletonData = new Array(6).fill('');
  const data = isLoading ? skeletonData : albums;

  return (
    (data?.length && (
      <AlbumGrid albums={data} columns={{ base: 1, sm: 2, xl: 3 }} />
    )) || (
      <Heading color={'text.muted'} size={'sm'}>
        No information available
      </Heading>
    )
  );
}
