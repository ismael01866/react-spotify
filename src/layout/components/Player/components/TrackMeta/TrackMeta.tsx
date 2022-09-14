import {
  AspectRatio,
  Box,
  Heading,
  HStack,
  Image,
  Link,
  Skeleton,
  VStack
} from '@chakra-ui/react';
import { default as NextLink } from 'next/link';
import { IAlbum } from 'src/types/album';
import { IArtist } from 'src/types/artist';
import { ITrack } from 'src/types/track';

interface TrackMetaProps {
  track: ITrack;
  album: IAlbum;
  artist: IArtist;
}

export function TrackMeta(props: TrackMetaProps) {
  const { album, artist, track } = props;

  return (
    <HStack spacing={12}>
      <AspectRatio h={'full'} ratio={4 / 3} w={'7xs'}>
        <Image
          maxHeight={'full'}
          src={album?.images?.[0]?.url}
          alt={album.name}
          fallback={<Skeleton startColor={''} />}
        />
      </AspectRatio>

      <VStack>
        <Box fontSize={'xs'}>
          <NextLink href={`/artists/${artist.id}`} passHref>
            <Link noOfLines={1}>{artist.name}</Link>
          </NextLink>

          <NextLink href={`/albums/${album.id}`} passHref>
            <Heading fontSize={'xs'} noOfLines={1} mt={1} mb={2}>
              <Link>{track.name}</Link>
            </Heading>
          </NextLink>
        </Box>
      </VStack>
    </HStack>
  );
}
