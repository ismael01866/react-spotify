import {
  Box,
  Heading,
  Link,
  Skeleton,
  Text,
  VStack
} from '@chakra-ui/react';
import { Card } from 'components/Card';
import moment from 'moment';
import { default as NextLink } from 'next/link';
import { ImageAlbum } from 'src/components/Image/ImageAlbum';
import { IAlbum } from 'src/types/album';
import { CardButtonPlay, CardMeta } from '../components';

export interface CardAlbumProps {
  album: IAlbum;
  [others: string]: any;
}

export function CardAlbum(props: CardAlbumProps) {
  const { album, ...others } = props;
  const { id, uri, name, release_date } = album;

  return (
    <Skeleton isLoaded={!!id}>
      <Card position={'relative'} role={'group'} {...others}>
        <Box boxShadow={'base'} position={'relative'}>
          <NextLink href={`/albums/${id}`} passHref>
            <Link>
              <ImageAlbum album={album} />
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
