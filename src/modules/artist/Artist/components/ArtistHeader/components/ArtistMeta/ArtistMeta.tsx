import { Flex, Heading } from '@chakra-ui/react';

import { IArtist } from 'types/artist';

interface ArtistMetaProps {
  artist: IArtist;
}

export function ArtistMeta(props: ArtistMetaProps) {
  const { artist } = props;
  const { name, followers } = artist;

  return (
    <Flex direction={'column'}>
      <Heading color={'text.base'} fontSize={'xs'} letterSpacing={2}>
        ARTIST
      </Heading>

      <Heading noOfLines={1} lineHeight={'initial'} size={'3xl'}>
        {name}
      </Heading>

      <Heading color={'text.base'} fontSize={'sm'} mt={4}>
        {followers?.total?.toLocaleString()} followers
      </Heading>
    </Flex>
  );
}
