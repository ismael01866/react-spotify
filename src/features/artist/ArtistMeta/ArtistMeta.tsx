import { Flex, Heading, SkeletonText, Text } from '@chakra-ui/react';

import { IArtist } from 'src/types/artist';

export interface ArtistMetaProps {
  artist: IArtist;
  isLoading: boolean;
}

export function ArtistMeta(props: ArtistMetaProps) {
  const { artist, isLoading } = props;

  console.log(artist);

  return (
    (!isLoading && (
      <Flex direction={'column'}>
        <Text color={'text.base'}>ARTIST</Text>
        <Heading noOfLines={1}>{artist.name}</Heading>

        <Text color={'text.base'} mt={4}>
          {artist?.followers?.total?.toLocaleString()} followers
        </Text>
      </Flex>
    )) || <></>
  );
}
