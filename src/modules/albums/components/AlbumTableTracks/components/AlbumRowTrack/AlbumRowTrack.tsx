import { Box, Heading, Td, Text, Tr } from '@chakra-ui/react';
import moment from 'moment';
import { useRef } from 'react';
import { ButtonPlay } from 'src/components/Button/ButtonPlay';
import { TrackButtonFollow } from 'src/modules/tracks/components/TrackButtonFollow';
import { ITrack } from 'src/types/track';

interface AlbumRowTrackProps {
  index: number;
  track: ITrack;
}

export function AlbumRowTrack(props: AlbumRowTrackProps) {
  const { index, track } = props;
  const { uri, name, duration_ms, is_playable = true } = track;

  const buttonPlayRef = useRef<HTMLButtonElement>(null);

  return (
    <Tr
      role={'group'}
      onDoubleClick={() => {
        buttonPlayRef.current?.click();
      }}
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
        <TrackButtonFollow track={track} />
      </Td>

      <Td textAlign={'right'}>
        <Text fontSize={'sm'}>
          {moment(duration_ms).format('mm:ss')}
        </Text>
      </Td>
    </Tr>
  );
}
