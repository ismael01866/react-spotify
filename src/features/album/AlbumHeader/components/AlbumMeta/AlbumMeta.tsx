import { Flex, Heading, HStack, Link } from '@chakra-ui/react';
import moment from 'moment';
import { default as NextLink } from 'next/link';
import { pluralize } from 'src/lib/utils';
import { IAlbum } from 'src/types/album';

export interface AlbumMetaProps {
  album: IAlbum;
}

export function AlbumMeta(props: AlbumMetaProps) {
  const { album } = props;

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
      <Heading noOfLines={1}>{album.name}</Heading>

      <HStack
        alignItems={'center'}
        color={'text.base'}
        divider={<span>&bull;</span>}
        mt={4}
        gap={1}
      >
        <Heading fontSize={'sm'} noOfLines={1}>
          {album.artists?.map((artist, index) => (
            <span key={artist.id}>
              {index !== 0 && <>, </>}
              <NextLink href={`/artists/${artist.id}`} passHref>
                <Link>{artist.name}</Link>
              </NextLink>
            </span>
          ))}
        </Heading>

        <Heading fontSize={'sm'}>
          {moment(album.release_date).format('YYYY')}
        </Heading>

        <Heading fontSize={'sm'} noOfLines={1}>
          {pluralize('song', album.total_tracks)}
        </Heading>
      </HStack>
    </Flex>
  );
}
