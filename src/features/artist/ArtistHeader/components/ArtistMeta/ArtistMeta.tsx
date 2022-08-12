import { Flex, Heading } from '@chakra-ui/react';
import { IArtist } from 'src/types/artist';

export interface ArtistMetaProps {
  artist: IArtist;
}

export function ArtistMeta(props: ArtistMetaProps) {
  const { artist } = props;

  return (
    <Flex direction={'column'}>
      <Heading color={'text.muted'} fontSize={'xs'} letterSpacing={2}>
        ARTIST
      </Heading>
      <Heading noOfLines={1}>{artist.name}</Heading>

      <Heading color={'text.base'} fontSize={'sm'} mt={4}>
        {artist?.followers?.total?.toLocaleString()} followers
      </Heading>
    </Flex>
  );
}
