import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { IUser } from 'src/types/user';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import { mutate } from 'swr';

interface UserButtonFollowProps {
  user: IUser;
}

export function UserButtonFollow(props: UserButtonFollowProps) {
  const { user } = props;
  const { id: ids, is_following } = user;

  const [isFollowing, setIsFollowing] = useState(is_following);

  const handleOnClick = () => {
    const method = isFollowing ? 'DELETE' : 'PUT';
    const updateURL = utilWithQueryParams('/api/spotify/me/following', {
      ids,
      type: 'user'
    });

    // update SWR's cache regarding
    // the 'is_following' prop for a given user

    mutate(async () => {
      await fetcher(updateURL, { method }).then(({ isFollowing }) => {
        setIsFollowing(isFollowing);
        user.is_following = isFollowing;
      });

      return user;
    });
  };

  return (
    <Button
      leftIcon={isFollowing ? <FaHeart /> : <FaRegHeart />}
      onClick={handleOnClick}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  );
}
