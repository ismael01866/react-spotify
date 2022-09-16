import { Box, Heading, Link, Text, VStack } from '@chakra-ui/react';
import { Card } from 'components/Card';
import { capitalize } from 'lodash';
import { default as NextLink } from 'next/link';
import { useCallback } from 'react';
import {
  CardButtonPlay,
  CardMeta
} from 'src/components/Card/components';
import { Skeleton } from 'src/components/Skeleton';
import { ITrack } from 'src/types/track';
import { TrackImage } from '../TrackImage';

interface TrackCardProps {
  track: ITrack;
  [others: string]: any;
}

export function TrackCard(props: TrackCardProps) {
  const { track, ...others } = props;
  const { id, uri, context } = track;

  const getNameByContext = useCallback((track: ITrack) => {
    if (!track.context) return;

    const {
      context: { type }
    } = track;

    switch (type) {
      case 'album':
        return track?.album?.name;

      case 'artist':
        return track?.artists?.[0]?.name;

      default:
        break;
    }
  }, []);

  const getURLByContext = useCallback((track: ITrack) => {
    if (!track.context) return;

    const {
      context: { type }
    } = track;

    switch (type) {
      case 'album':
        return `/albums/${track?.album?.id}`;

      case 'artist':
        return `/artists/${track?.artists?.[0]?.id}`;

      default:
        break;
    }
  }, []);

  return (
    <Skeleton isLoaded={!!id}>
      <Card role={'group'} {...others}>
        <Box boxShadow={'base'} position={'relative'}>
          <NextLink href={`${getURLByContext(track)}`} passHref>
            <Link>
              <TrackImage track={track} />
            </Link>
          </NextLink>

          <CardButtonPlay uri={uri} />
        </Box>

        <CardMeta>
          <VStack alignItems={'flex-start'} spacing={1}>
            <Heading fontSize={'sm'} noOfLines={1}>
              {getNameByContext(track)}
            </Heading>
            <Text color={'text.base'} fontSize={'sm'} noOfLines={1}>
              {capitalize(context?.type)}
            </Text>
          </VStack>
        </CardMeta>
      </Card>
    </Skeleton>
  );
}
