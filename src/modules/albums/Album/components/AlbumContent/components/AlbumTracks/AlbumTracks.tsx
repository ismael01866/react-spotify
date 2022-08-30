import { Skeleton, Stack } from '@chakra-ui/react';
import { useContext } from 'react';
import { useAlbumTracksWithFollow } from 'src/utils/hooks/services';
import { AlbumContext } from 'src/modules/albums/Album/AlbumContext';
import { UserContext } from 'src/modules/users';
import { ITrack } from 'src/types/track';
import { AlbumTableTracks } from './components';

export function AlbumTracks() {
  const { country } = useContext(UserContext);
  const { id: albumID } = useContext(AlbumContext);

  const { tracks, isLoading } = useAlbumTracksWithFollow(albumID, {
    country,
    limit: 50
  });

  const skeletonData = new Array(20).fill('');
  const data = isLoading ? skeletonData : (tracks as ITrack[]);

  const EmptyContent = () => {
    return (
      <Stack spacing={4}>
        {data.map((_, index) => (
          <Skeleton key={index} height={20} />
        ))}
      </Stack>
    );
  };

  return (
    <>
      {(!isLoading && (
        <>
          <AlbumTableTracks tracks={data} />
        </>
      )) || <EmptyContent />}
    </>
  );
}
