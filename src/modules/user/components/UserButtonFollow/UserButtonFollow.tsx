import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Button } from '@chakra-ui/react';
import { mutate } from 'swr';

import { useSpotifyApi } from 'hooks/api';
import { IUser } from 'types/user';
import { fetcher } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

interface UserButtonFollowProps {
  user: IUser;
}

export function UserButtonFollow(props: UserButtonFollowProps) {
  const { user } = props;
  const { id, is_following } = user;

  const [isFollowing, setIsFollowing] = useState(is_following);

  const { headers, url: baseURL } = useSpotifyApi(`/me/following`);

  const handleOnClick = () => {
    const url = utilWithQueryParams(baseURL, {
      ids: id,
      type: 'user'
    });

    // update SWR's cache regarding
    // the 'is_following' prop for a given user

    mutate(async () => {
      await fetcher(url, {
        method: isFollowing ? 'DELETE' : 'PUT',
        ...headers
      }).then(() => {
        user.is_following = !isFollowing;
        setIsFollowing(!isFollowing);
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
