import {
  AspectRatio,
  Heading,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  Skeleton,
  VStack
} from '@chakra-ui/react';

import { default as NextLink } from 'next/link';

import { Card } from 'components/Card';
import { ButtonPlay } from 'src/components/Button/ButtonPlay';

import { IArtist } from 'src/types/artist';

export interface CardArtistProps {
  artist: IArtist;
  [others: string]: any;
}

export function CardArtist(props: CardArtistProps) {
  const { artist, ...others } = props;
  const { id, name, uri, images } = artist;

  return (
    <LinkBox>
      <Card position={'relative'} role={'group'} {...others}>
        <NextLink href={`/artists/${id}`} passHref>
          <LinkOverlay>
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
          </LinkOverlay>
        </NextLink>

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
            <Heading fontSize={'sm'} noOfLines={1}>
              {name}
            </Heading>
          </VStack>

          <ButtonPlay
            context_uri={uri}
            opacity={0}
            _groupHover={{ opacity: 1 }}
          />
        </HStack>
      </Card>
    </LinkBox>
  );
}
