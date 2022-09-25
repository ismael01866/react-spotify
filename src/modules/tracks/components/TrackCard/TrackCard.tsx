import { Box, Heading, Link, Text, VStack } from '@chakra-ui/react';
import { Card } from 'components/Card';
import { capitalize } from 'lodash';
import { default as NextLink } from 'next/link';
import { useCallback, useContext, useRef } from 'react';
import {
  CardButtonPlay,
  CardMeta
} from 'src/components/Card/components';
import { Skeleton } from 'src/components/Skeleton';
import { LayoutGridContext } from 'src/layout/components/LayoutGrid/LayoutGridContext';
import { ITrack } from 'src/types/track';
import { useOnScreen } from 'src/utils/hooks/dom';
import { TrackImage } from '../TrackImage';

interface TrackCardProps {
  track: ITrack;
  [others: string]: any;
}

export function TrackCard(props: TrackCardProps) {
  const { track, ...others } = props;
  const { id, uri, context } = track;

  const { contentElRef } = useContext(LayoutGridContext);

  const containerEl = useRef<HTMLDivElement>(null);
  const isIntersecting = useOnScreen(containerEl, {
    root: contentElRef.current,
    rootMargin: '400px 0px'
  });

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

      case 'track':
        return track?.name;

      case 'playlist':
        return track?.playlist?.name;

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
      case 'track':
      case 'album':
        return `/albums/${track?.album?.id}`;

      case 'artist':
        return `/artists/${track?.artists?.[0]?.id}`;

      case 'playlist':
        return `/playlists/${track?.playlist?.id}`;

      default:
        break;
    }
  }, []);

  return (
    <Box ref={containerEl}>
      {isIntersecting ? (
        <Skeleton isLoaded={!!id}>
          <Card role={'group'} {...others}>
            <Box boxShadow={'dark-lg'} position={'relative'}>
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
      ) : (
        <Skeleton minH={80} startColor={''} />
      )}
    </Box>
  );
}
