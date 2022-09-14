import { IconButton, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useButtonFollowToast } from 'src/components/Button/ButtonFollow';
import { ITrack } from 'src/types/track';
import { TOOLTIP_OPEN_DELAY } from 'src/utils/constants';
import { fetcher } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';
import { mutate } from 'swr';

interface TrackButtonFollowProps {
  track: ITrack;
}

export function TrackButtonFollow(props: TrackButtonFollowProps) {
  const { toast } = useButtonFollowToast();

  const { track } = props;
  const { id: ids, is_following } = track;

  const [isFollowing, setIsFollowing] = useState(is_following);

  const handleOnClick = () => {
    const method = isFollowing ? 'DELETE' : 'PUT';
    const updateURL = withQueryParams('/api/spotify/me/tracks', {
      ids
    });

    // update SWR's cache regarding
    // the 'is_following' prop for a given track

    mutate(async () => {
      await fetcher(updateURL, { method }).then(({ isFollowing }) => {
        const msg = isFollowing ? 'Added to' : 'Removed from';

        setIsFollowing(isFollowing);
        track.is_following = isFollowing;

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
      openDelay={TOOLTIP_OPEN_DELAY}
      placement="top"
    >
      <IconButton
        aria-label={'follow-track'}
        colorScheme={isFollowing ? 'spotify' : ''}
        icon={isFollowing ? <FaHeart /> : <FaRegHeart />}
        variant={'fade'}
        style={{ opacity: (isFollowing && '1') || '' }}
        onClick={handleOnClick}
      />
    </Tooltip>
  );
}
