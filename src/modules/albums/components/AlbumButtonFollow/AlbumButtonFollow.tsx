import { IconButton, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useButtonFollowToast } from 'src/components/Button/ButtonFollow';
import { IAlbum } from 'src/types/album';
import { TOOLTIP_OPEN_DELAY } from 'src/utils/constants';
import { fetcher } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';

export interface AlbumButtonFollowProps {
  album: IAlbum;
}

export function AlbumButtonFollow(props: AlbumButtonFollowProps) {
  const { toast } = useButtonFollowToast();

  const { album } = props;
  const { id: ids, is_following } = album;

  const [isFollowing, setIsFollowing] = useState(is_following);

  const handleOnClick = () => {
    const method = isFollowing ? 'DELETE' : 'PUT';
    const url = withQueryParams('/api/spotify/me/albums', { ids });

    fetcher(url, { method }).then(({ isFollowing }) => {
      const msg = isFollowing ? 'Added to' : 'Removed from';

      setIsFollowing(isFollowing);
      toast({ description: `${msg} your liked albums` });
    });
  };

  return (
    <Tooltip
      label={
        (isFollowing ? 'Remove from' : 'Save to') + ' your library'
      }
      openDelay={TOOLTIP_OPEN_DELAY}
      placement="top"
    >
      <IconButton
        aria-label={'follow-album'}
        icon={isFollowing ? <FaHeart /> : <FaRegHeart />}
        onClick={handleOnClick}
      />
    </Tooltip>
  );
}
