import { Skeleton, Stack } from '@chakra-ui/react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ArtistContext } from 'src/modules/artists/Artist/ArtistContext';
import { ArtistTablePopularTracks } from 'src/modules/artists/components';
import { UserContext } from 'src/modules/users';
import { ITrack } from 'src/types/track';
import { useArtistTopTracksWithFollow } from 'src/utils/hooks/services';
import { ArtistButtonTogglePopularTracks } from './components/ArtistButtonTogglePopularTracks';

export function ArtistPopularTracks() {
  const { country } = useContext(UserContext);
  const { id: artistID } = useContext(ArtistContext);

  const { tracks: oTracks, isLoading } = useArtistTopTracksWithFollow(
    artistID,
    {
      country
    }
  );

  const initialVisibleCount = 6;
  const [tracks, setTracks] = useState<ITrack[]>([]);

  const skeletonData = new Array(initialVisibleCount).fill('');
  const data = isLoading ? skeletonData : (tracks as ITrack[]);

  const hideTracks = useCallback(
    (tracks: ITrack[], opts = { hideFromThisPosition: 5 }) =>
      tracks.map((track, index) => {
        track.is_visible = index < opts.hideFromThisPosition;

        return track;
      }),
    []
  );

  useEffect(() => {
    if (!oTracks) return;

    setTracks(
      hideTracks(oTracks, { hideFromThisPosition: initialVisibleCount })
    ); // Show the top { initialVisibleCount } tracks, hide the rest
  }, [oTracks, hideTracks]);

  const LoadingContent = () => {
    return (
      <Stack spacing={4}>
        {data.map((_, index) => (
          <Skeleton key={index} height={20} />
        ))}
      </Stack>
    );
  };

  return (
    (!isLoading && (
      <>
        <ArtistTablePopularTracks tracks={data} />

        <br />
        <ArtistButtonTogglePopularTracks
          tracks={data}
          setTracks={setTracks}
          toggleCount={initialVisibleCount}
        />
      </>
    )) || <LoadingContent />
  );
}
