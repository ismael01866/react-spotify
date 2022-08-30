import {
  Box,
  Heading,
  Link,
  Skeleton,
  Text,
  VStack
} from '@chakra-ui/react';
import { Card } from 'components/Card';
import { default as NextLink } from 'next/link';
import {
  CardButtonPlay,
  CardMeta
} from 'src/components/Card/components';
import { ImageTrack } from 'src/components/Image/ImageTrack';
import { ITrack } from 'src/types/track';

export interface TrackCardProps {
  track: ITrack;
  [others: string]: any;
}

export function TrackCard(props: TrackCardProps) {
  const { track, ...others } = props;
  const { id, name, uri, album, artists = [] } = track;

  return (
    <Skeleton isLoaded={!!id}>
      <Card role={'group'} {...others}>
        <Box boxShadow={'base'} position={'relative'}>
          <NextLink href={`/albums/${album?.id}`} passHref>
            <Link>
              <ImageTrack track={track} />
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
              {artists.map((artist, index) => (
                <span key={artist.id}>
                  {index !== 0 && <>, </>}
                  <NextLink href={`/artists/${artist.id}`} passHref>
                    <Link>{artist.name}</Link>
                  </NextLink>
                </span>
              ))}
            </Text>
          </VStack>
        </CardMeta>
      </Card>
    </Skeleton>
  );
}
