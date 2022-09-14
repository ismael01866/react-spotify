import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Image,
  Skeleton,
  Td,
  Text,
  Tr
} from '@chakra-ui/react';
import moment from 'moment';
import { useRef } from 'react';
import { ButtonPlay } from 'src/components/Button/ButtonPlay';
import { TrackButtonFollow } from 'src/modules/tracks/components/TrackButtonFollow';
import { ITrack } from 'src/types/track';

interface ArtistRowPopularTrackProps {
  track: ITrack;
}

export function ArtistRowPopularTrack(
  props: ArtistRowPopularTrackProps
) {
  const { track } = props;
  const { uri, name, duration_ms, album, is_playable } = track;

  const buttonPlayRef = useRef<HTMLButtonElement>(null);

  return (
    <Tr
      role={'group'}
      onDoubleClick={() => {
        buttonPlayRef.current?.click();
      }}
    >
      <Td>
        <Flex alignContent={'center'} pos={'relative'} w={'full'}>
          <AspectRatio boxSize={10} ratio={4 / 3}>
            <Image
              src={album?.images?.[0]?.url}
              alt={name}
              fallback={<Skeleton startColor={''} />}
            />
          </AspectRatio>

          {/* On Hover */}

          <Box
            display={'none'}
            left={0}
            top={'50%'}
            pos={'absolute'}
            sx={{ transform: 'translateY(-50%)' }}
            _groupHover={{
              bgColor: 'blackAlpha.500',
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
        </Flex>
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
