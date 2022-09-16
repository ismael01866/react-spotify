import { Box, Heading, Link, Text, VStack } from '@chakra-ui/react';
import { Card } from 'components/Card';
import moment from 'moment';
import { default as NextLink } from 'next/link';
import {
  CardButtonPlay,
  CardMeta
} from 'src/components/Card/components';
import { Skeleton } from 'src/components/Skeleton';
import { IAlbum } from 'src/types/album';
import { AlbumImage } from '../AlbumImage';

interface AlbumCardProps {
  album: IAlbum;
  [others: string]: any;
}

export function AlbumCard(props: AlbumCardProps) {
  const { album, ...others } = props;
  const { id, uri, name, release_date } = album;

  return (
    <Skeleton isLoaded={!!id}>
      <Card position={'relative'} role={'group'} {...others}>
        <Box boxShadow={'base'} position={'relative'}>
          <NextLink href={`/albums/${id}`} passHref>
            <Link>
              <AlbumImage album={album} />
            </Link>
          </NextLink>

          <CardButtonPlay context_uri={uri} />
        </Box>

        <CardMeta>
          <VStack alignItems={'flex-start'} spacing={1}>
            <Heading fontSize={'sm'} noOfLines={1}>
              {name}
            </Heading>
            <Text color={'text.base'} fontSize={'sm'} noOfLines={1}>
              {moment(release_date).format('YYYY')}
            </Text>
          </VStack>
        </CardMeta>
      </Card>
    </Skeleton>
  );
}
