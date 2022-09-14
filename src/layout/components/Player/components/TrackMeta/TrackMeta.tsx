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
import { ITrack } from 'src/types/track';

interface TrackMetaProps {
  track: ITrack;
}

export function TrackMeta(props: TrackMetaProps) {
  const { track } = props;
  const { album, artists } = track;

  console.log(track);

  return (
    <HStack spacing={12}>
      <AspectRatio h={'full'} ratio={4 / 3} w={'7xs'}>
        <Image
          maxHeight={'full'}
          src={album?.images?.[0]?.url}
          alt={album?.name}
          fallback={<Skeleton startColor={''} />}
        />
      </AspectRatio>

      <VStack>
        <Box fontSize={'xs'}>
          <NextLink href={`/artists/${artists?.[0]?.id}`} passHref>
            <Link noOfLines={1}>{artists?.[0]?.name}</Link>
          </NextLink>

          <NextLink href={`/albums/${album?.id}`} passHref>
            <Heading fontSize={'xs'} noOfLines={1} mt={1} mb={2}>
              <Link>{track.name}</Link>
            </Heading>
          </NextLink>
        </Box>
      </VStack>
    </HStack>
  );
}
