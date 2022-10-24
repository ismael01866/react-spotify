import { memo, useContext } from 'react';

import { useMeTracksWithFollow } from 'hooks/services';
import { CollectionRowTrack } from 'modules/collection/components/CollectionRowTrack';
import { CollectionRowTrackEmpty } from 'modules/collection/components/CollectionRowTrackEmpty';
import { CollectionTracksContext } from 'state';

interface CollectionRowTracksChunkProps {
  index: number;
  skeletonTracks: any[];
}

const MemoizedRowEmpty = memo(CollectionRowTrackEmpty);

export function CollectionRowTracksChunk(props: CollectionRowTracksChunkProps) {
  const { chunkSize } = useContext(CollectionTracksContext);

  const { index: chunkIndex, skeletonTracks } = props;
  const { tracks, isLoading } = useMeTracksWithFollow(
    {
      limit: chunkSize,
      offset: (chunkIndex - 1) * chunkSize
    },
    {},
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  if (isLoading) {
    return (
      <>
        {skeletonTracks?.map((_, index) => (
          <MemoizedRowEmpty key={index} />
        ))}
      </>
    );
  }

  return (
    <>
      {tracks?.map((track, index) => {
        return (
          <CollectionRowTrack
            key={index}
            index={(chunkIndex - 1) * chunkSize + (index + 1)}
            track={track}
          />
        );
      })}
    </>
  );
}
