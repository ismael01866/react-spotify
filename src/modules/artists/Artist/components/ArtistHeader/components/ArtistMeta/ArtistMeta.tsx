import { Flex, Heading } from '@chakra-ui/react';
import { IArtist } from 'src/types/artist';

interface ArtistMetaProps {
  artist: IArtist;
}

export function ArtistMeta(props: ArtistMetaProps) {
  const { artist } = props;
  const { name, followers } = artist;

  return (
    <Flex direction={'column'}>
      <Heading
        color={'text.muted'}
        fontSize={'xs'}
        letterSpacing={2}
        mb={1}
      >
        ARTIST
      </Heading>
      <Heading noOfLines={1}>{name}</Heading>

      <Heading color={'text.base'} fontSize={'sm'} mt={4}>
        {followers?.total?.toLocaleString()} followers
      </Heading>
    </Flex>
  );
}
