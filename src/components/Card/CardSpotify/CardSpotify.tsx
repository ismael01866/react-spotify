import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  VStack
} from '@chakra-ui/react';
import { default as NextLink } from 'next/link';
import { useCallback, useContext, useRef } from 'react';
import { Skeleton } from 'src/components/Skeleton';
import { LayoutGridContext } from 'src/layout/components/LayoutGrid/LayoutGridContext';
import { IAlbum } from 'src/types/album';
import { IArtist } from 'src/types/artist';
import { IPlaylist } from 'src/types/playlist';
import { ITrack } from 'src/types/track';
import { useOnScreen } from 'src/utils/hooks/dom';
import { Card } from '../Card';
import { CardButtonPlay } from '../components';
import {
  CardSpotifyContent,
  CardSpotifyEmptySkeleton,
  CardSpotifyImage
} from './components';
import { getNameByContext, getURLByType } from './utils';

export interface CardSpotifyProps<TData, TType> {
  data: TData;
  type: TType;
}

export function CardSpotify<
  TData extends IAlbum | IArtist | IPlaylist | ITrack,
  TType extends 'album' | 'artist' | 'playlist' | 'track'
>(props: CardSpotifyProps<TData, TType>) {
  const { type, data, ...others } = props;

  const containerEl = useRef<HTMLDivElement>(null);

  return (
    <Box ref={containerEl}>
      <Skeleton isLoaded={!!data.id}>
        <Card position={'relative'} role={'group'} {...others}>
          <CardImage data={data} type={type} parentRef={containerEl} />
          <CardContent data={data} type={type} />
        </Card>
      </Skeleton>
    </Box>
  );
}

function CardImage({ data, type, parentRef }: any) {
  const { contentElRef } = useContext(LayoutGridContext);

  const isIntersecting = useOnScreen(parentRef, {
    root: contentElRef.current,
    rootMargin: '400px 0px'
  });

  const memoGetURLByType = useCallback(getURLByType, []);

  return (
    <Box boxShadow={'dark-lg'} position={'relative'}>
      {isIntersecting ? (
        <>
          <NextLink href={`${memoGetURLByType(data)}`} passHref>
            <Link>
              <CardSpotifyImage type={type} data={data} />
            </Link>
          </NextLink>

          <CardButtonPlay type={type} data={data} />
        </>
      ) : (
        <CardSpotifyEmptySkeleton type={type} />
      )}
    </Box>
  );
}

function CardContent({ data, type }: any) {
  const { name } = data;

  const memoGetNameByContext = useCallback(getNameByContext, []);

  return (
    <Flex bg={'bg.900'} mt={4} w={'full'}>
      <VStack
        alignItems={'flex-start'}
        noOfLines={1}
        spacing={1}
        w={'full'}
      >
        <>
          <Heading fontSize={'sm'} noOfLines={1}>
            {type === 'track' ? memoGetNameByContext(data) : name}
          </Heading>

          <HStack justifyContent={'space-between'}>
            <CardSpotifyContent type={type} data={data} />
          </HStack>
        </>
      </VStack>
    </Flex>
  );
}
