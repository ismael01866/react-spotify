import { IconButton, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useButtonFollowToast } from 'src/components/Button/ButtonFollow';
import { ITrack } from 'src/types/track';
import { TOOLTIP_OPEN_DELAY } from 'src/utils/constants';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import { useSpotifyApi } from 'src/utils/hooks/api';
import { mutate } from 'swr';

interface TrackButtonFollowProps {
  track: ITrack;
}

export function TrackButtonFollow(props: TrackButtonFollowProps) {
  const { toast } = useButtonFollowToast();

  const { track } = props;
  const { id, is_following } = track;

  const [isFollowing, setIsFollowing] = useState(is_following);

  const { headers, url: baseURL } = useSpotifyApi(`/me/tracks`);

  const handleOnClick = () => {
    const url = utilWithQueryParams(baseURL, { ids: id });

    mutate(async () => {
      await fetcher(url, {
        method: isFollowing ? 'DELETE' : 'PUT',
        ...headers
      }).then(() => {
        const msg = !isFollowing ? 'Added to' : 'Removed from';
        track.is_following = !isFollowing;

        setIsFollowing(!isFollowing);
        toast({ description: `${msg} your liked songs` });
      });

      return track;
    });
  };

  return (
    <Tooltip
      label={
        (isFollowing ? 'Remove from' : 'Save to') + ' your library'
      }
      closeOnClick={false}
      openDelay={TOOLTIP_OPEN_DELAY}
      placement="top"
    >
      <IconButton
        aria-label={'follow-track'}
        color={isFollowing ? 'spotify.500' : ''}
        colorScheme={isFollowing ? 'spotify' : ''}
        icon={isFollowing ? <FaHeart /> : <FaRegHeart />}
        variant={'fade'}
        style={{ opacity: (isFollowing && '1') || '' }}
        onClick={handleOnClick}
      />
    </Tooltip>
  );
}
