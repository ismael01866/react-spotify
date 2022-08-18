import { IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { fetcher } from 'src/lib/fetch';
import { withQueryParams } from 'src/lib/utils';
import { ITrack } from 'src/types/track';

export interface TrackButtonFollowProps {
  track: ITrack;
}

export function TrackButtonFollow(props: TrackButtonFollowProps) {
  const { track } = props;
  const { id: ids, is_following } = track;

  const [isFollowing, setIsFollowing] = useState(is_following);

  const handleOnClick = () => {
    const url = withQueryParams('/api/spotify/me/tracks', { ids });
    const method = isFollowing ? 'DELETE' : 'PUT';

    fetcher(url, { method }).then(({ isFollowing }) => {
      console.log(isFollowing);

      setIsFollowing(isFollowing);
    });
  };

  return (
    <IconButton
      aria-label={'follow-track'}
      colorScheme={isFollowing ? 'spotify' : ''}
      icon={isFollowing ? <FaHeart /> : <FaRegHeart />}
      variant={'fade'}
      style={{ opacity: (isFollowing && '1') || '' }}
      onClick={handleOnClick}
    />
  );
}
