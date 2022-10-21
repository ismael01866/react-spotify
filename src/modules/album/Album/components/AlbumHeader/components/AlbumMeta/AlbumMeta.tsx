import { Flex, Heading, HStack, Link } from '@chakra-ui/react';
import moment from 'moment';
import { default as NextLink } from 'next/link';
import { IAlbum } from 'src/types/album';
import { utilPluralize } from 'src/utils/helpers';

interface AlbumMetaProps {
  album: IAlbum;
}

export function AlbumMeta(props: AlbumMetaProps) {
  const { album } = props;
  const { name, artists, release_date, total_tracks } = album;

  return (
    <Flex direction={'column'}>
      <Heading color={'text.base'} fontSize={'xs'} letterSpacing={2}>
        ALBUM
      </Heading>

      <Heading noOfLines={1} lineHeight={'initial'} size={'3xl'}>
        {name}
      </Heading>

      <HStack
        alignItems={'center'}
        divider={<span>&bull;</span>}
        mt={4}
        gap={1}
      >
        <Heading fontSize={'sm'} noOfLines={1}>
          {artists?.map((artist) => (
            <span key={artist.id}>
              <NextLink href={`/artists/${artist.id}`} passHref>
                <Link>{artist.name}</Link>
              </NextLink>
            </span>
          ))}
        </Heading>

        <Heading color={'text.base'} fontSize={'sm'}>
          {moment(release_date).format('YYYY')}
        </Heading>

        <Heading color={'text.base'} fontSize={'sm'} noOfLines={1}>
          {utilPluralize('song', total_tracks)}
        </Heading>
      </HStack>
    </Flex>
  );
}
