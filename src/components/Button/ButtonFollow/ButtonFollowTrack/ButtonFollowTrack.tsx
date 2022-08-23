import { IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { fetcher } from 'src/lib/fetch';
import { withQueryParams } from 'src/lib/utils';
import { ITrack } from 'src/types/track';
import { useButtonFollowToast } from '../hooks/useButtonFollowToast';

export interface ButtonFollowTrackProps {
  track: ITrack;
}

export function ButtonFollowTrack(props: ButtonFollowTrackProps) {
  const { toast } = useButtonFollowToast();

  const { track } = props;
  const { id: ids, is_following } = track;

  const [isFollowing, setIsFollowing] = useState(is_following);

  const handleOnClick = () => {
    const method = isFollowing ? 'DELETE' : 'PUT';
    const url = withQueryParams('/api/spotify/me/tracks', { ids });

    fetcher(url, { method }).then(({ isFollowing }) => {
      const msg = isFollowing ? 'Added to' : 'Removed from';

      setIsFollowing(isFollowing);
      toast({ description: `${msg} your liked songs` });
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
