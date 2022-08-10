import { fetcher } from 'src/lib/fetch';

import { Button, Skeleton } from '@chakra-ui/react';
import { useArtistFollow } from 'src/lib/hooks/services/useArtistFollow';
import { withQueryParams } from 'src/lib/utils';

import { IArtist } from 'src/types/artist';
import { useState } from 'react';

export interface ArtistButtonFollowProps {
  artist: IArtist;
}

export function ArtistButtonFollow(props: ArtistButtonFollowProps) {
  const { artist } = props;
  const ids = artist.id;

  const { isFollowingArtist, isLoading } = useArtistFollow({ ids });
  const [isFollowing, setIsFollowing] = useState(isFollowingArtist);

  const handleOnClick = () => {
    const url = withQueryParams(
      '/api/spotify/me/following',
      Object.assign({ type: 'artist' }, { ids })
    );

    const method = isFollowing ? 'DELETE' : 'PUT';

    fetcher(url, { method }).then(({ isFollowing }) => {
      setIsFollowing(isFollowing);
    });
  };

  return (
    <Skeleton isLoaded={!isLoading}>
      <Button onClick={handleOnClick} variant={'outline'}>
        {isFollowing ? 'Following' : 'Follow'}
      </Button>
    </Skeleton>
  );
}
