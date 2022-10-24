import { Dispatch, SetStateAction } from 'react';
import { Button, useBoolean } from '@chakra-ui/react';

import { ITrack } from 'types/track';

interface ArtistButtonTogglePopularTracksProps {
  tracks: ITrack[];
  setTracks: Dispatch<SetStateAction<ITrack[]>>;
  toggleCount: number;
}

export function ArtistButtonTogglePopularTracks(
  props: ArtistButtonTogglePopularTracksProps
) {
  const { tracks, setTracks, toggleCount } = props;
  const [showMore, setShowMore] = useBoolean(false);

  const handleOnClick = () => {
    setShowMore.toggle();

    const parsed = tracks.map((track, index) => {
      if (index >= toggleCount) track.is_visible = !showMore;
      return track;
    });

    setTracks(parsed);
  };

  return (
    <Button variant={'link'} onClick={handleOnClick}>
      Show {showMore ? 'less' : 'more'}
    </Button>
  );
}
