import { useRef } from 'react';
import { Box, Heading, Td, Text } from '@chakra-ui/react';
import moment from 'moment';

import { ButtonPlay } from 'components';
import { TrTrack } from 'components/Table/Tr';
import { TrackButtonFollow } from 'modules/track/components';

interface CollectionRowTrackProps {
  index: number;
  track: SpotifyApi.PlaylistTrackObject;
}

export function CollectionRowTrack(props: CollectionRowTrackProps) {
  const { index, track } = props;

  const { uri, name, duration_ms, is_playable = true } = track.track!;
  const { added_at } = track;

  const containerEl = useRef<HTMLTableRowElement>(null);
  const buttonPlayRef = useRef<HTMLButtonElement>(null);

  return (
    <TrTrack
      role={'group'}
      onDoubleClick={() => {
        buttonPlayRef.current?.click();
      }}
      ref={containerEl}
    >
      <Td textAlign={'right'}>
        <Box pos={'relative'} px={2}>
          {index}

          <Box
            display={'none'}
            left={'50%'}
            top={'50%'}
            pos={'absolute'}
            sx={{ transform: 'translate(-50%, -50%)' }}
            _groupHover={{
              bgColor: 'black',
              display: 'unset'
            }}
          >
            <ButtonPlay
              uri={uri}
              ref={buttonPlayRef}
              disabled={!is_playable}
              colorScheme={'gray'}
              pointerEvents={is_playable ? 'initial' : 'none'}
              variant={'ghost'}
            />
          </Box>
        </Box>
      </Td>

      <Td px={0} whiteSpace={'normal'}>
        <Heading fontSize={'sm'} noOfLines={1}>
          {name}
        </Heading>
      </Td>

      <Td>
        <Heading fontSize={'sm'} noOfLines={1}>
          {moment(added_at).fromNow()}
        </Heading>
      </Td>

      <Td>
        <TrackButtonFollow track={track.track!} />
      </Td>

      <Td textAlign={'right'}>
        <Text fontSize={'sm'}>{moment(duration_ms).format('mm:ss')}</Text>
      </Td>
    </TrTrack>
  );
}
