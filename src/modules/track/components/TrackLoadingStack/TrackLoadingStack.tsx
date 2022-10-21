import { Stack } from '@chakra-ui/react';
import { Skeleton } from 'src/components/Skeleton';
import { ITrack } from 'src/types/track';

interface TrackLoadingStackProps {
  count?: number;
  [others: string]: any;
}

export function TrackLoadingStack(props: TrackLoadingStackProps) {
  const { count = 20, ...others } = props;

  const skeletonData = new Array(count).fill('') as ITrack[];

  return (
    <Stack spacing={4} {...others}>
      {skeletonData.map((_, index) => (
        <Skeleton key={index} height={20} />
      ))}
    </Stack>
  );
}
