import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Link,
  SlideFade,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import { default as NextLink } from 'next/link';
import { useCallback, useContext, useMemo, useRef } from 'react';
import { BoxAnimated } from 'src/components/Box';
import { EmptySkeleton, Skeleton } from 'src/components/Skeleton';
import { LayoutGridContext } from 'src/layout/components/LayoutGrid/LayoutGridContext';
import { IAlbum } from 'src/types/album';
import { IArtist } from 'src/types/artist';
import { IPlaylist } from 'src/types/playlist';
import { ITrack } from 'src/types/track';
import { useOnScreen } from 'src/utils/hooks/dom';
import { Card } from '../Card';
import { CardButtonPlay } from '../components';
import { CardSpotifyContent, CardSpotifyImage } from './components';
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
    <Box ref={containerEl} boxShadow={'xl'}>
      <Skeleton isLoaded={!!data.id}>
        <Card padding={0} position={'relative'} {...others}>
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

  const { isOpen: onHover, onOpen, onClose } = useDisclosure();
  const memoGetURLByType = useMemo(() => getURLByType(data), [data]);

  return (
    <Box position={'relative'}>
      {isIntersecting ? (
        <Box onMouseEnter={onOpen} onMouseLeave={onClose}>
          <NextLink href={`${memoGetURLByType}`} passHref>
            <Link>
              <Center>
                <AspectRatio
                  boxSize={'full'}
                  overflow={'hidden'}
                  ratio={4 / 4}
                >
                  <BoxAnimated
                    boxSize={'full'}
                    boxShadow={'dark-lg'}
                    animate={{
                      opacity: 1.0,
                      transform: `scale(${onHover ? '1.1' : '1'})`
                    }}
                    initial={{ opacity: 0.2, transform: 'scale(1)' }}
                    sx={{
                      transform: onHover ? 'scale(1.2)' : ''
                    }}
                    // @ts-ignore
                    transition={{
                      duration: 0.24
                    }}
                  >
                    <CardSpotifyImage type={type} data={data} />
                  </BoxAnimated>
                </AspectRatio>
              </Center>
            </Link>
          </NextLink>

          <SlideFade in={onHover} offsetY={'1rem'}>
            <CardButtonPlay type={type} data={data} />
          </SlideFade>
        </Box>
      ) : (
        <EmptySkeleton />
      )}
    </Box>
  );
}

function CardContent({ data, type }: any) {
  const { name } = data;

  const memoGetNameByContext = useCallback(getNameByContext, []);

  return (
    <Flex bg={'bg.900'} p={4} w={'full'}>
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
