import {
  AspectRatio,
  Box,
  Heading,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack
} from '@chakra-ui/react';

import { IAlbum } from 'src/types/album';
import { IArtist } from 'src/types/artist';
import { ITrack } from 'src/types/track';

export interface TrackMetaProps {
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
          src={album.images && album.images[0].url}
          alt={album.name}
          fallback={<Skeleton />}
        />
      </AspectRatio>

      <VStack>
        <Box fontSize={'xs'}>
          <Text color={'text.base'} noOfLines={1}>
            {artist.name}
          </Text>

          <Heading fontSize={'xs'} noOfLines={1} mt={1} mb={2}>
            {track.name}
          </Heading>
        </Box>
      </VStack>
    </HStack>
  );
}
