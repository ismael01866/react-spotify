import {
  AspectRatio,
  Heading,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack
} from '@chakra-ui/react';

import { Card } from 'components/Card';
import { ButtonPlay } from './components';

import { IArtist } from 'src/types/artist';

export interface CardArtistProps {
  artist: IArtist;
  [others: string]: any;
}

export function CardArtist(props: CardArtistProps) {
  const { artist, ...others } = props;
  const { name, uri, images, followers } = artist;

  return (
    <Card position={'relative'} role={'group'} {...others}>
      <AspectRatio
        borderRadius={'base'}
        overflow={'hidden'}
        ratio={4 / 3}
      >
        <Image
          alt={name}
          src={images && images[0].url}
          fallback={<Skeleton />}
        />
      </AspectRatio>

      <HStack
        bg={'blackAlpha.700'}
        pos={'absolute'}
        bottom={0}
        left={0}
        justifyContent={'space-between'}
        p={4}
        spacing={4}
        w={'full'}
        _groupHover={{ bg: 'blackAlpha.800' }}
      >
        <VStack alignItems={'flex-start'} spacing={1}>
          <Heading fontSize={'md'} noOfLines={1}>
            {name}
          </Heading>
          <Text color={'text.base'} fontSize={'sm'} noOfLines={1}>
            {followers?.total?.toLocaleString()} followers
          </Text>
        </VStack>

        <ButtonPlay uri={uri} />
      </HStack>
    </Card>
  );
}
