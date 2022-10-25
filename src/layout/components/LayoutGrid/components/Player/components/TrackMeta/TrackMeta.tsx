import { useEffect, useState } from 'react';
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

import { ITrack } from 'types/track';

interface TrackMetaProps {
  track: ITrack;
}

export function TrackMeta(props: TrackMetaProps) {
  const { track } = props;
  const { album, artists } = track;

  const [albumID, setAlbumID] = useState('');
  const [artistID, setArtistID] = useState('');

  useEffect(() => {
    const albumURI = track.album?.uri;
    const artistURI = track.artists?.[0]?.uri;

    if (albumURI) {
      const index = albumURI?.lastIndexOf(':') + 1;
      const albumID = albumURI.substring(index);

      setAlbumID(albumID);
    }

    if (artistURI) {
      const index = artistURI?.lastIndexOf(':') + 1;
      const artistID = artistURI.substring(index);

      setArtistID(artistID);
    }
  }, [track]);

  return (
    <HStack gap={12}>
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
          <NextLink href={`/artists/${artistID}`} passHref>
            <Link noOfLines={1}>{artists?.[0]?.name}</Link>
          </NextLink>

          <NextLink href={`/albums/${albumID}`} passHref>
            <Heading fontSize={'xs'} noOfLines={1} mt={1} mb={2}>
              <Link>{track.name}</Link>
            </Heading>
          </NextLink>
        </Box>
      </VStack>
    </HStack>
  );
}
