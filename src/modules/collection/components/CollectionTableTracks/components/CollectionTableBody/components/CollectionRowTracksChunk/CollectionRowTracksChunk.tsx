import { memo, useContext } from 'react';
import { CollectionTracksContext } from 'src/modules/collection/CollectionTracks/CollectionTracksContext';
import { CollectionRowTrack } from 'src/modules/collection/components/CollectionRowTrack';
import { CollectionRowTrackEmpty } from 'src/modules/collection/components/CollectionRowTrackEmpty';
import { useMeTracksWithFollow } from 'src/utils/hooks/services';

interface CollectionRowTracksChunkProps {
  index: number;
  skeletonTracks: any[];
}

const MemoizedRowEmpty = memo(CollectionRowTrackEmpty);

export function CollectionRowTracksChunk(
  props: CollectionRowTracksChunkProps
) {
  const { chunkSize } = useContext(CollectionTracksContext);

  const { index, skeletonTracks } = props;
  const { tracks, isLoading } = useMeTracksWithFollow(
    {
      limit: chunkSize,
      offset: (index - 1) * chunkSize
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
            index={index + 1}
            track={track}
          />
        );
      })}
    </>
  );
}
