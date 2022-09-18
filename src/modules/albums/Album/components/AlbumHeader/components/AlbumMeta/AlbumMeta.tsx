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
      <Heading
        color={'text.muted'}
        fontSize={'xs'}
        letterSpacing={2}
        mb={1}
      >
        ALBUM
      </Heading>
      <Heading noOfLines={1}>{name}</Heading>

      <HStack
        alignItems={'center'}
        color={'text.base'}
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

        <Heading fontSize={'sm'}>
          {moment(release_date).format('YYYY')}
        </Heading>

        <Heading fontSize={'sm'} noOfLines={1}>
          {utilPluralize('song', total_tracks)}
        </Heading>
      </HStack>
    </Flex>
  );
}
