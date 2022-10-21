import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { IUser } from 'src/types/user';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import { useSpotifyApi } from 'src/utils/hooks/api';
import { mutate } from 'swr';

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
