import {
  AspectRatio,
  Heading,
  HStack,
  Image,
  Skeleton,
  Td,
  Text,
  Tr
} from '@chakra-ui/react';
import moment from 'moment';
import { ITrack } from 'src/types/track';

export interface ArtistRowPopularTrackProps {
  index: number;
  track: ITrack;
}

export function ArtistRowPopularTrack(
  props: ArtistRowPopularTrackProps
) {
  const { index, track } = props;
  const { name, duration_ms, album } = track;

  console.log(track);

  return (
    <Tr>
      <Td>
        <AspectRatio boxSize={8} ratio={4 / 3}>
          <Image
            src={album?.images?.[0].url}
            alt={name}
            fallback={<Skeleton />}
          />
        </AspectRatio>
      </Td>
      <Td pl={0} whiteSpace={'normal'}>
        <Heading fontSize={'sm'} noOfLines={1}>
          {name}
        </Heading>
      </Td>
      <Td pr={0} textAlign={'right'}>
        <Text fontSize={'sm'}>
          {moment(duration_ms).format('mm:ss')}
        </Text>
      </Td>
    </Tr>
  );
}
