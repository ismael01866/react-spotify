import { Flex, Heading, Text } from '@chakra-ui/react';

import { IArtist } from 'src/types/artist';

export interface ArtistMetaProps {
  artist: IArtist;
  isLoading: boolean;
}

export function ArtistMeta(props: ArtistMetaProps) {
  const { artist, isLoading } = props;

  return (
    (!isLoading && (
      <Flex direction={'column'}>
        <Text color={'text.muted'} fontSize={'sm'} letterSpacing={2}>
          ARTIST
        </Text>
        <Heading noOfLines={1}>{artist.name}</Heading>

        <Text color={'text.base'} fontSize={'sm'} mt={4}>
          {artist?.followers?.total?.toLocaleString()} followers
        </Text>
      </Flex>
    )) || <></>
  );
}
