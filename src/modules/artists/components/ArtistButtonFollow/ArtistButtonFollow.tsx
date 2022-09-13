import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useButtonFollowToast } from 'src/components/Button/ButtonFollow';
import { IArtist } from 'src/types/artist';
import { fetcher } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';
import { mutate } from 'swr';

export interface ArtistButtonFollowProps {
  artist: IArtist;
}

export function ArtistButtonFollow(props: ArtistButtonFollowProps) {
  const { toast } = useButtonFollowToast();

  const { artist } = props;
  const { id: ids, is_following } = artist;

  const [isFollowing, setIsFollowing] = useState(is_following);

  const handleOnClick = () => {
    const method = isFollowing ? 'DELETE' : 'PUT';
    const updateURL = withQueryParams('/api/spotify/me/following', {
      ids,
      type: 'artist'
    });

    // update SWR's cache regarding
    // the 'is_following' prop for a given artist

    mutate(async () => {
      await fetcher(updateURL, { method }).then(({ isFollowing }) => {
        const msg = isFollowing ? 'Saved to' : 'Removed from';

        setIsFollowing(isFollowing);
        artist.is_following = isFollowing;

        toast({ description: `${msg} your library` });
      });

      return artist;
    });
  };

  return (
    <Button
      leftIcon={isFollowing ? <FaHeart /> : <FaRegHeart />}
      onClick={handleOnClick}
      variant={'outline'}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  );
}
