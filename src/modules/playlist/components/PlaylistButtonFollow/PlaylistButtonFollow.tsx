import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useButtonFollowToast } from 'src/components/Button/ButtonFollow';
import { IPlaylist } from 'src/types/playlist';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import { mutate } from 'swr';

interface PlaylistButtonFollowProps {
  playlist: IPlaylist;
}

export function PlaylistButtonFollow(props: PlaylistButtonFollowProps) {
  const { toast } = useButtonFollowToast();

  const { playlist } = props;
  const { id, is_following } = playlist;

  const [isFollowing, setIsFollowing] = useState(is_following);

  const handleOnClick = () => {
    const method = isFollowing ? 'DELETE' : 'PUT';
    const updateURL = utilWithQueryParams(
      `/api/spotify/playlists/${id}/followers`
    );

    // update SWR's cache regarding
    // the 'is_following' prop for a given playlist

    mutate(async () => {
      await fetcher(updateURL, { method }).then(({ isFollowing }) => {
        const msg = isFollowing ? 'Saved to' : 'Removed from';

        setIsFollowing(isFollowing);
        playlist.is_following = isFollowing;

        toast({ description: `${msg} your library` });
      });

      return playlist;
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
