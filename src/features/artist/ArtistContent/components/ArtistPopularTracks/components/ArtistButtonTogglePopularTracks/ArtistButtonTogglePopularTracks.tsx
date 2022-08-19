import { Button, useBoolean } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { ITrack } from 'src/types/track';

export interface ArtistButtonTogglePopularTracksProps {
  tracks: ITrack[];
  setTracks: Dispatch<SetStateAction<ITrack[]>>;
}

export function ArtistButtonTogglePopularTracks(
  props: ArtistButtonTogglePopularTracksProps
) {
  const { tracks, setTracks } = props;
  const [showMore, setShowMore] = useBoolean(false);

  const handleOnClick = () => {
    setShowMore.toggle();

    const parsed = tracks.map((track, index) => {
      if (index >= 5) track.is_visible = !showMore;
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
