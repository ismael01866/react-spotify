import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { fetcher } from 'src/lib/fetch';
import { withQueryParams } from 'src/lib/utils';
import { IArtist } from 'src/types/artist';
import { useButtonFollowToast } from '../hooks/useButtonFollowToast';

export interface ButtonFollowArtistProps {
  artist: IArtist;
}

export function ButtonFollowArtist(props: ButtonFollowArtistProps) {
  const { toast } = useButtonFollowToast();

  const { artist } = props;
  const { id: ids, is_following } = artist;

  const [isFollowing, setIsFollowing] = useState(is_following);

  const handleOnClick = () => {
    const method = isFollowing ? 'DELETE' : 'PUT';
    const url = withQueryParams('/api/spotify/me/following', {
      ids,
      type: 'artist'
    });

    fetcher(url, { method }).then(({ isFollowing }) => {
      const msg = isFollowing ? 'Saved to' : 'Removed from';

      setIsFollowing(isFollowing);
      toast({ description: `${msg} your library` });
    });
  };

  return (
    <Button onClick={handleOnClick} variant={'outline'}>
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  );
}
