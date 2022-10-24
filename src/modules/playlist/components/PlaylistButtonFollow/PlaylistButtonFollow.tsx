import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useButtonFollowToast } from 'src/components/Button/ButtonFollow';
import { IPlaylist } from 'src/types/playlist';
import { fetcher } from 'src/utils/fetch';
import { useSpotifyApi } from 'src/hooks/api';
import { mutate } from 'swr';

interface PlaylistButtonFollowProps {
  playlist: IPlaylist;
}

export function PlaylistButtonFollow(props: PlaylistButtonFollowProps) {
  const { toast } = useButtonFollowToast();

  const { playlist } = props;
  const { id, is_following } = playlist;

  const [isFollowing, setIsFollowing] = useState(is_following);

  const { headers, url } = useSpotifyApi(`/playlists/${id}/followers`);

  const handleOnClick = () => {
    // update SWR's cache regarding
    // the 'is_following' prop for a given album

    mutate(async () => {
      await fetcher(url, {
        method: isFollowing ? 'DELETE' : 'PUT',
        ...headers
      }).then(() => {
        const msg = !isFollowing ? 'Saved to' : 'Removed from';
        playlist.is_following = !isFollowing;

        setIsFollowing(!isFollowing);
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
