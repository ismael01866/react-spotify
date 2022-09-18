import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useButtonFollowToast } from 'src/components/Button/ButtonFollow';
import { IAlbum } from 'src/types/album';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import { mutate } from 'swr';

interface AlbumButtonFollowProps {
  album: IAlbum;
}

export function AlbumButtonFollow(props: AlbumButtonFollowProps) {
  const { toast } = useButtonFollowToast();

  const { album } = props;
  const { id: ids, is_following } = album;

  const [isFollowing, setIsFollowing] = useState(is_following);

  const handleOnClick = () => {
    const method = isFollowing ? 'DELETE' : 'PUT';
    const updateURL = utilWithQueryParams('/api/spotify/me/albums', {
      ids
    });

    // update SWR's cache regarding
    // the 'is_following' prop for a given album

    mutate(async () => {
      await fetcher(updateURL, { method }).then(({ isFollowing }) => {
        const msg = isFollowing ? 'Added to' : 'Removed from';

        setIsFollowing(isFollowing);
        album.is_following = isFollowing;

        toast({ description: `${msg} your liked albums` });
      });

      return album;
    });
  };

  return (
    <Button
      leftIcon={isFollowing ? <FaHeart /> : <FaRegHeart />}
      onClick={handleOnClick}
      variant={'outline'}
    >
      {isFollowing ? 'Liked' : 'Like'}
    </Button>
  );
}
