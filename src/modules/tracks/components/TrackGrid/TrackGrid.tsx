import { SimpleGrid } from '@chakra-ui/react';
import { ITrack } from 'src/types/track';
import { TrackCard } from '../TrackCard';

interface TrackGridProps {
  tracks: ITrack[];
  [others: string]: any;
}

export function TrackGrid(props: TrackGridProps) {
  const { tracks, ...others } = props;

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 6 }}
      spacing={4}
      {...others}
    >
      {tracks?.map((track, index) => {
        return <TrackCard key={track.id || index} track={track} />;
      })}
    </SimpleGrid>
  );
}
