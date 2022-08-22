import { SimpleGrid } from '@chakra-ui/react';
import { CardTrack } from 'src/components/Card/CardTrack';
import { useTopTracks } from 'src/lib/hooks/services';

export interface FeaturedGridTracksProps {
  limit?: number;
  [others: string]: any;
}

export function FeaturedGridTracks(props: FeaturedGridTracksProps) {
  const { limit, ...others } = props;
  const { tracks, isLoading } = useTopTracks({ limit });

  const skeletonData = new Array(limit).fill('');
  const data = isLoading ? skeletonData : tracks;

  return (
    <SimpleGrid spacing={4} {...others}>
      {data?.map((track, index) => {
        return <CardTrack key={track.id || index} track={track} />;
      })}
    </SimpleGrid>
  );
}
