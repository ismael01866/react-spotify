import {
  Box,
  Heading,
  HStack,
  Link,
  Text,
  VStack
} from '@chakra-ui/react';
import { Card } from 'components/Card';
import moment from 'moment';
import { default as NextLink } from 'next/link';
import { useContext, useRef } from 'react';
import {
  CardButtonPlay,
  CardMeta
} from 'src/components/Card/components';
import { MetaPopularity } from 'src/components/Meta';
import { Skeleton } from 'src/components/Skeleton';
import { LayoutGridContext } from 'src/layout/components/LayoutGrid/LayoutGridContext';
import { IAlbum } from 'src/types/album';
import { useOnScreen } from 'src/utils/hooks/dom';
import { AlbumImage } from '../AlbumImage';

interface AlbumCardProps {
  album: IAlbum;
  [others: string]: any;
}

export function AlbumCard(props: AlbumCardProps) {
  const { album, ...others } = props;
  const { id, uri, name, release_date, popularity } = album;

  const { contentElRef } = useContext(LayoutGridContext);
  ``;
  const containerEl = useRef<HTMLDivElement>(null);
  const isIntersecting = useOnScreen(containerEl, {
    root: contentElRef.current,
    rootMargin: '400px 0px'
  });

  return (
    <Box ref={containerEl}>
      {isIntersecting ? (
        <Skeleton isLoaded={!!id}>
          <Card position={'relative'} role={'group'} {...others}>
            <Box boxShadow={'dark-lg'} position={'relative'}>
              <NextLink href={`/albums/${id}`} passHref>
                <Link>
                  <AlbumImage album={album} />
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
                  <Text color={'text.base'} fontSize={'sm'}>
                    {moment(release_date).format('YYYY')}
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
