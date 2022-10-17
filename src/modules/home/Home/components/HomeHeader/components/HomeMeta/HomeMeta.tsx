import { Flex, Heading } from '@chakra-ui/react';
import { IArtist } from 'src/types/artist';

interface HomeMetaProps {
  artist: IArtist;
}

export function HomeMeta(props: HomeMetaProps) {
  const { artist } = props;
  const { name } = artist;

  return (
    <Flex direction={'column'}>
      <Heading fontSize={'xs'} letterSpacing={2} mb={1} opacity={0.64}>
        RECOMMENDED
      </Heading>
      <Heading noOfLines={2} size={'4xl'}>
        {name}
      </Heading>
    </Flex>
  );
}
