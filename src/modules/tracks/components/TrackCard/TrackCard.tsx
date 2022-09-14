import {
  Box,
  Heading,
  Link,
  Skeleton,
  Text,
  VStack
} from '@chakra-ui/react';
import { Card } from 'components/Card';
import { capitalize } from 'lodash';
import { default as NextLink } from 'next/link';
import {
  CardButtonPlay,
  CardMeta
} from 'src/components/Card/components';
import { ITrack } from 'src/types/track';
import { getPositionOfSubstring } from 'src/utils/helpers';
import { TrackImage } from '../TrackImage';

export interface TrackCardProps {
  track: ITrack;
  [others: string]: any;
}

export function TrackCard(props: TrackCardProps) {
  const { track, ...others } = props;
  const { id, name, uri, context } = track;

  const getContextURL = (track: ITrack) => {
    if (!track.context) return;

    const {
      context: { type, uri = '' }
    } = track;

    switch (type) {
      case 'album':
        return `/albums/${track.album?.id}`;

      case 'artist':
        return `/artists/${track.artists?.[0].id}`;

      case 'playlist':
        // since the payload doesnt contain a proper playlist
        // object from where we can extract the playlist ID, we need
        // to parse the context uri ex. ('spotify:playlist:12345')

        const playlistID = uri.substring(
          getPositionOfSubstring(uri, ':', 2) + 1
        );

        return `/playlists/${playlistID}`;

      default:
        break;
    }
  };

  return (
    <Skeleton isLoaded={!!id}>
      <Card role={'group'} {...others}>
        <Box boxShadow={'base'} position={'relative'}>
          <NextLink href={`${getContextURL(track)}`} passHref>
            <Link>
              <TrackImage track={track} />
            </Link>
          </NextLink>

          <CardButtonPlay uri={uri} />
        </Box>

        <CardMeta>
          <VStack alignItems={'flex-start'} spacing={1}>
            <Heading fontSize={'sm'} noOfLines={1}>
              {name}
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
