import {
  AspectRatio,
  Box,
  Heading,
  Image,
  Link,
  Skeleton,
  Text,
  VStack
} from '@chakra-ui/react';
import { Card } from 'components/Card';
import { default as NextLink } from 'next/link';
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
    <Skeleton isLoaded={!!track.id}>
      <Card role={'group'} {...others}>
        <Box boxShadow={'base'} position={'relative'}>
          <AspectRatio overflow={'hidden'} ratio={4 / 3}>
            <NextLink href={`/albums/${album?.id}`} passHref>
              <Link>
                <Image
                  alt={name}
                  src={album?.images?.[0]?.url}
                  fallback={<Skeleton startColor={''} />}
                />
              </Link>
            </NextLink>
          </AspectRatio>

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
