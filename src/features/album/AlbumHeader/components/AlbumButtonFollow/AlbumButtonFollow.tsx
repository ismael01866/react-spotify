import { Button, Skeleton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { fetcher } from 'src/lib/fetch';
// import { AlbumFollow } from 'src/lib/hooks/services/AlbumFollow';
import { withQueryParams } from 'src/lib/utils';
import { IAlbum } from 'src/types/album';

export interface AlbumButtonFollowProps {
  album: IAlbum;
}

export function AlbumButtonFollow(props: AlbumButtonFollowProps) {
  const { album } = props;
  const ids = album.id;

  // const { albumsFollowed = [], isLoading } = AlbumFollow({ ids });
  // const [isFollowing, setIsFollowing] = useState(albumsFollowed[0]);

  // useEffect(() => {
  //   setIsFollowing(albumsFollowed[0]);
  // }, [albumsFollowed]);

  const handleOnClick = () => {
    // const url = withQueryParams(
    //   '/api/spotify/me/following',
    //   Object.assign({ type: 'album' }, { ids })
    // );
    // const method = isFollowing ? 'DELETE' : 'PUT';
    // fetcher(url, { method }).then(({ isFollowing }) => {
    //   setIsFollowing(isFollowing);
    // });
  };

  return (
    <></>
    // <Skeleton isLoaded={!isLoading}>
    //   <Button onClick={handleOnClick} variant={'outline'}>
    //     {isFollowing ? 'Following' : 'Follow'}
    //   </Button>
    // </Skeleton>
  );
}
