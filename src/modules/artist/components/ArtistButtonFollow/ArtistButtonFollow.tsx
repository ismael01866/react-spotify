import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useButtonFollowToast } from 'src/components/Button/ButtonFollow';
import { IArtist } from 'src/types/artist';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import { useSpotifyApi } from 'src/utils/hooks/api';
import { mutate } from 'swr';

interface ArtistButtonFollowProps {
  artist: IArtist;
}

export function ArtistButtonFollow(props: ArtistButtonFollowProps) {
  const { toast } = useButtonFollowToast();

  const { artist } = props;
  const { id, is_following } = artist;

  const [isFollowing, setIsFollowing] = useState(is_following);

  const { headers, url: baseURL } = useSpotifyApi(`/me/following`);

  const handleOnClick = () => {
    const url = utilWithQueryParams(baseURL, {
      ids: id,
      type: 'artist'
    });

    // update SWR's cache regarding
    // the 'is_following' prop for a given artist

    mutate(async () => {
      await fetcher(url, {
        method: isFollowing ? 'DELETE' : 'PUT',
        ...headers
      }).then(() => {
        const msg = !isFollowing ? 'Saved to' : 'Removed from';
        artist.is_following = !isFollowing;

        setIsFollowing(!isFollowing);
        toast({ description: `${msg} your library` });
      });

      return artist;
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
