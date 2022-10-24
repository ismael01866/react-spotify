import { Stack } from '@chakra-ui/react';

import { Skeleton } from 'components/Skeleton';
import { ITrack } from 'types/track';

interface ArtistLoadingGridProps {
  count?: number;
  [others: string]: any;
}

export function ArtistLoadingGrid(props: ArtistLoadingGridProps) {
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
