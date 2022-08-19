import { Heading } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { ArtistContext } from 'src/features/artist/ArtistContext';
import { UserContext } from 'src/features/user';
import { useArtistTopTracksWithFollow } from 'src/lib/hooks/services';
import { ITrack } from 'src/types/track';
import { ArtistButtonTogglePopularTracks } from './components/ArtistButtonTogglePopularTracks';
import { ArtistTablePopularTracks } from './components/ArtistTablePopularTracks';

export function ArtistPopularTracks() {
  const { country } = useContext(UserContext);
  const { artistID } = useContext(ArtistContext);

  const { tracks: oTracks, isLoading } = useArtistTopTracksWithFollow(
    artistID,
    country || ''
  );

  const [tracks, setTracks] = useState<ITrack[]>([]);

  const skeletonData = new Array(5).fill('');
  const data = isLoading ? skeletonData : (tracks as ITrack[]);

  useEffect(() => {
    if (!oTracks) return;

    setTracks(hideTracks(oTracks)); // Show the top 5 tracks, hide the rest
  }, [oTracks]);

  return (
    <>
      <Heading fontSize={'2xl'}>Popular</Heading>

      <br />
      <ArtistTablePopularTracks tracks={data} />

      <br />
      <ArtistButtonTogglePopularTracks
        tracks={data}
        setTracks={setTracks}
      />
    </>
  );
}

const hideTracks = (
  tracks: ITrack[],
  opts = {
    hideFromThisPosition: 5
  }
) => {
  return tracks.map((track, index) => {
    track.is_visible = index < opts.hideFromThisPosition;
    return track;
  });
};
