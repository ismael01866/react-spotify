import { Flex, Heading, Link } from '@chakra-ui/react';
import { default as NextLink } from 'next/link';

import { IArtist } from 'types/artist';

interface HomeMetaProps {
  artist: IArtist;
}

export function HomeMeta(props: HomeMetaProps) {
  const { artist } = props;
  const { id, name } = artist;

  return (
    <Flex direction={'column'}>
      <Heading color={'text.base'} fontSize={'xs'} letterSpacing={2}>
        RECOMMENDED
      </Heading>

      <Heading noOfLines={1} lineHeight={'initial'} size={'3xl'}>
        <NextLink href={`/artists/${id}`} passHref>
          <Link>{name}</Link>
        </NextLink>
      </Heading>
    </Flex>
  );
}
