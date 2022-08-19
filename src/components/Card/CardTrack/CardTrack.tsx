import {
  AspectRatio,
  Box,
  Heading,
  Image,
  Skeleton,
  Text,
  VStack
} from '@chakra-ui/react';
import { Card } from 'components/Card';
import { ITrack } from 'src/types/track';
import { CardButtonPlay, CardMeta } from '../components';

export interface CardTrackProps {
  track: ITrack;
  [others: string]: any;
}

export function CardTrack(props: CardTrackProps) {
  const { track, ...others } = props;
  const { name, uri, album, artists = [] } = track;

  return (
    <Card role={'group'} {...others}>
      <Box boxShadow={'base'} position={'relative'}>
        <AspectRatio overflow={'hidden'} ratio={4 / 3}>
          <Image
            alt={name}
            src={album?.images?.[0].url}
            fallback={<Skeleton />}
          />
        </AspectRatio>

        <CardButtonPlay uri={uri} />
      </Box>

      <CardMeta>
        <VStack alignItems={'flex-start'} spacing={1}>
          <Heading fontSize={'sm'} noOfLines={1}>
            {name}
          </Heading>
          <Text color={'text.base'} fontSize={'sm'} noOfLines={1}>
            {artists.map((artist) => artist.name).join(', ')}
          </Text>
        </VStack>
      </CardMeta>
    </Card>
  );
}
