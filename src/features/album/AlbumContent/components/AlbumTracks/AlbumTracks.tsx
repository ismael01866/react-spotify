import { Skeleton, Stack } from '@chakra-ui/react';
import { useContext } from 'react';
import { AlbumContext } from 'src/features/album/AlbumContext';
import { UserContext } from 'src/features/user';
import { useAlbumTracksWithFollow } from 'src/lib/hooks/services';
import { ITrack } from 'src/types/track';
import { AlbumTableTracks } from './components';

export function AlbumTracks() {
  const { country } = useContext(UserContext);
  const { albumID } = useContext(AlbumContext);

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

          <br />
          {/* <ArtistButtonTogglePopularTracks
            tracks={data}
            setTracks={setTracks}
            toggleCount={initialVisibleCount}
          /> */}
        </>
      )) || <EmptyContent />}
    </>
  );
}
