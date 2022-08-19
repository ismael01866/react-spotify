import {
  AspectRatio,
  Box,
  Heading,
  Image,
  Skeleton,
  Text,
  VStack
} from '@chakra-ui/react';
import { Card } from 'components/Card';
import moment from 'moment';
import { IAlbum } from 'src/types/album';
import { CardButtonPlay, CardMeta } from '../components';

export interface CardAlbumProps {
  album: IAlbum;
  [others: string]: any;
}

export function CardAlbum(props: CardAlbumProps) {
  const { album, ...others } = props;
  const { uri, name, images, release_date } = album;

  return (
    <Card position={'relative'} role={'group'} {...others}>
      <Box boxShadow={'base'} position={'relative'}>
        <AspectRatio overflow={'hidden'} ratio={4 / 3}>
          <Image
            alt={name}
            src={images?.[0].url}
            fallback={<Skeleton />}
          />
        </AspectRatio>

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
  );
}
