import { SimpleGrid } from '@chakra-ui/react';

import { CardSpotify } from 'components/Card/CardSpotify';
import { ITrack } from 'types/track';

interface TrackGridProps {
  tracks: ITrack[];
  [others: string]: any;
}

export function TrackGrid(props: TrackGridProps) {
  const { tracks, ...others } = props;

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      gap={4}
      {...others}
    >
      {tracks?.map((track, index) => {
        return (
          <CardSpotify key={track.id || index} type={'track'} data={track} />
        );
      })}
    </SimpleGrid>
  );
}
