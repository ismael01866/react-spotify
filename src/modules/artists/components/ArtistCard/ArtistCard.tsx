import {
  Box,
  Heading,
  HStack,
  Link,
  Text,
  VStack
} from '@chakra-ui/react';
import { Card } from 'components/Card';
import { default as NextLink } from 'next/link';
import { useContext, useRef } from 'react';
import {
  CardButtonPlay,
  CardMeta
} from 'src/components/Card/components';
import { MetaPopularity } from 'src/components/Meta';
import { Skeleton } from 'src/components/Skeleton';
import { LayoutGridContext } from 'src/layout/components/LayoutGrid/LayoutGridContext';
import { IArtist } from 'src/types/artist';
import { useOnScreen } from 'src/utils/hooks/dom';
import { ArtistImage } from '../ArtistImage';

interface ArtistCardProps {
  artist: IArtist;
  [others: string]: any;
}

export function ArtistCard(props: ArtistCardProps) {
  const { artist, ...others } = props;
  const { id, name, uri, genres, popularity } = artist;

  const { contentElRef } = useContext(LayoutGridContext);

  const containerEl = useRef<HTMLDivElement>(null);
  const isIntersecting = useOnScreen(containerEl, {
    root: contentElRef.current,
    rootMargin: '400px 0px'
  });

  return (
    <Box ref={containerEl}>
      {isIntersecting ? (
        <Skeleton isLoaded={!!id}>
          <Card role={'group'} {...others}>
            <Box boxShadow={'dark-lg'} position={'relative'}>
              <NextLink href={`/artists/${id}`} passHref>
                <Link>
                  <ArtistImage artist={artist} />
                </Link>
              </NextLink>

              <CardButtonPlay context_uri={uri} />
            </Box>

            <CardMeta>
              <VStack
                alignItems={'flex-start'}
                noOfLines={1}
                spacing={1}
                w={'full'}
              >
                <Heading fontSize={'sm'} noOfLines={1}>
                  {name}
                </Heading>

                <HStack justifyContent={'space-between'}>
                  <Text
                    color={'text.base'}
                    fontSize={'sm'}
                    noOfLines={1}
                  >
                    {[...(genres || ['No genre'])]
                      .splice(0, 2)
                      .join(', ')}
                  </Text>

                  <MetaPopularity popularity={popularity} />
                </HStack>
              </VStack>
            </CardMeta>
          </Card>
        </Skeleton>
      ) : (
        <Skeleton minH={80} startColor={''} />
      )}
    </Box>
  );
}
