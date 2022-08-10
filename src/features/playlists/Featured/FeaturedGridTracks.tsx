import { SimpleGrid, Skeleton } from '@chakra-ui/react';
import { CardTrack } from 'src/components/Card/CardTrack';
import { useTopTracks } from 'src/lib/hooks/services';

export interface FeaturedGridTracksProps {
  limit?: number;
}

export function FeaturedGridTracks(props: FeaturedGridTracksProps) {
  const { limit } = props;
  const { tracks, isLoading } = useTopTracks({ limit });

  const skeletonData = new Array(limit).fill('');
  const data = isLoading ? skeletonData : tracks;

  return (
    (data && (
      <SimpleGrid columns={{ base: 1, sm: 2, md: 6 }} spacing={4}>
        {data.map((track, index) => {
          return (
            <Skeleton key={track.id || index} isLoaded={!isLoading}>
              <CardTrack track={track} />
            </Skeleton>
          );
        })}
      </SimpleGrid>
    )) || <></>
  );
}
