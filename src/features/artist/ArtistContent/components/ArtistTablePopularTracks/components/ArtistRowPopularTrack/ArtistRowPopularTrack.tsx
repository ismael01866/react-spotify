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
import { ButtonPlay } from 'src/components/Button/ButtonPlay';
import { ITrack } from 'src/types/track';

export interface ArtistRowPopularTrackProps {
  track: ITrack;
}

export function ArtistRowPopularTrack(
  props: ArtistRowPopularTrackProps
) {
  const { track } = props;
  const { uri, name, duration_ms, album } = track;

  return (
    <Tr role={'group'}>
      <Td px={0}>
        <Flex alignContent={'center'} pos={'relative'} w={'full'}>
          <AspectRatio boxSize={10} ratio={4 / 3}>
            <Image
              src={album?.images?.[0].url}
              alt={name}
              fallback={<Skeleton />}
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
              colorScheme={'gray'}
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

      <Td px={0} textAlign={'right'}>
        <Text fontSize={'sm'}>
          {moment(duration_ms).format('mm:ss')}
        </Text>
      </Td>
    </Tr>
  );
}
