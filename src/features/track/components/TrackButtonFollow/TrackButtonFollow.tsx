import { Button, Skeleton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { fetcher } from 'src/lib/fetch';
import { useTrackFollow } from 'src/lib/hooks/services/useTrackFollow';
import { withQueryParams } from 'src/lib/utils';
import { ITrack } from 'src/types/track';

export interface TrackButtonFollowProps {
  track: ITrack;
}

export function TrackButtonFollow(props: TrackButtonFollowProps) {
  const { track } = props;
  const ids = track.id;

  const { tracksFollowed = [], isLoading } = useTrackFollow({ ids });
  const [isFollowing, setIsFollowing] = useState(tracksFollowed[0]);

  useEffect(() => {
    setIsFollowing(tracksFollowed[0]);
  }, [tracksFollowed]);

  const handleOnClick = () => {
    const url = withQueryParams(
      '/api/spotify/me/following',
      Object.assign({ type: 'track' }, { ids })
    );

    const method = isFollowing ? 'DELETE' : 'PUT';

    fetcher(url, { method }).then(({ isFollowing }) => {
      setIsFollowing(isFollowing);
    });
  };

  return (
    <Skeleton isLoaded={!isLoading}>
      <Button onClick={handleOnClick} variant={'outline'}>
        {isFollowing ? 'Following' : 'Follow'}
      </Button>
    </Skeleton>
  );
}
