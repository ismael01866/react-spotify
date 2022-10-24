import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Button } from '@chakra-ui/react';
import { mutate } from 'swr';

import { useButtonFollowToast } from 'components/Button/ButtonFollow';
import { useSpotifyApi } from 'hooks/api';
import { IAlbum } from 'types/album';
import { fetcher } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

interface AlbumButtonFollowProps {
  album: IAlbum;
}

export function AlbumButtonFollow(props: AlbumButtonFollowProps) {
  const { toast } = useButtonFollowToast();

  const { album } = props;
  const { id, is_following } = album;

  const [isFollowing, setIsFollowing] = useState(is_following);

  const { headers, url: baseURL } = useSpotifyApi(`/me/albums`);

  const handleOnClick = () => {
    const url = utilWithQueryParams(baseURL, { ids: id });

    // update SWR's cache regarding
    // the 'is_following' prop for a given album

    mutate(async () => {
      await fetcher(url, {
        method: isFollowing ? 'DELETE' : 'PUT',
        ...headers
      }).then(() => {
        const msg = !isFollowing ? 'Added to' : 'Removed from';
        album.is_following = !isFollowing;

        setIsFollowing(!isFollowing);
        toast({ description: `${msg} your liked albums` });
      });

      return album;
    });
  };

  return (
    <Button
      leftIcon={isFollowing ? <FaHeart /> : <FaRegHeart />}
      onClick={handleOnClick}
    >
      {isFollowing ? 'Liked' : 'Like'}
    </Button>
  );
}
