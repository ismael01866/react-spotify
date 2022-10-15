import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Text,
  VStack
} from '@chakra-ui/react';
import { capitalize } from 'lodash';
import moment from 'moment';
import { default as NextLink } from 'next/link';
import { memo, useCallback, useContext, useRef } from 'react';
import { MetaPopularity } from 'src/components/Meta';
import { Skeleton } from 'src/components/Skeleton';
import { LayoutGridContext } from 'src/layout/components/LayoutGrid/LayoutGridContext';
import { IAlbum } from 'src/types/album';
import { IArtist } from 'src/types/artist';
import { IPlaylist } from 'src/types/playlist';
import { ITrack } from 'src/types/track';
import { utilPluralize } from 'src/utils/helpers';
import { useOnScreen } from 'src/utils/hooks/dom';
import { Card } from '../Card';
import { CardButtonPlay, CardSpotifyImage } from '../components';
import { CardSpotifyEmptySkeleton } from '../components/CardSpotifyEmptySkeleton';
import { getNameByContext, getURLByType } from './utils';

interface CardSpotifyProps {
  // type: 'album' | 'artist' | 'playlist' | 'track';
  // data: IAlbum | IArtist | IPlaylist | ITrack;
  // data: T;
  // [others: string]: any;
}

export const CardSpotify = (props: any) => {
  const { type, data, ...others } = props;

  const { id, name } = data;

  if (type === 'album') {
    var { release_date, popularity } = data as IAlbum;
  }

  if (type === 'artist') {
    var { genres, popularity } = data as IArtist;
  }

  if (type === 'playlist') {
    var { tracks } = data as IPlaylist;
  }

  if (type === 'track') {
    var { context } = data as ITrack;
  }

  const { contentElRef } = useContext(LayoutGridContext);

  const containerEl = useRef<HTMLDivElement>(null);
  const isIntersecting = useOnScreen(containerEl, {
    root: contentElRef.current,
    rootMargin: '400px 0px'
  });

  const memoGetURLByType = useCallback(getURLByType, []);
  const memoGetNameByContext = useCallback(getNameByContext, []);

  const MemoCardSpotifyEmptySkeleton = memo(CardSpotifyEmptySkeleton);

  return (
    <Box ref={containerEl}>
      <Skeleton isLoaded={!!id}>
        {isIntersecting ? (
          <Card position={'relative'} role={'group'} {...others}>
            <Box boxShadow={'dark-lg'} position={'relative'}>
              <>
                <NextLink href={`${memoGetURLByType(data)}`} passHref>
                  <Link>
                    <CardSpotifyImage type={type} data={data} />
                  </Link>
                </NextLink>

                <CardButtonPlay type={type} data={data} />
              </>
            </Box>

            <Flex bg={'bg.900'} mt={4} w={'full'}>
              <VStack
                alignItems={'flex-start'}
                noOfLines={1}
                spacing={1}
                w={'full'}
              >
                <>
                  <Heading fontSize={'sm'} noOfLines={1}>
                    {type === 'track'
                      ? memoGetNameByContext(data)
                      : name}
                  </Heading>

                  <HStack justifyContent={'space-between'}>
                    {(() => {
                      switch (type) {
                        case 'album':
                          return (
                            <>
                              <Text
                                color={'text.base'}
                                fontSize={'sm'}
                                noOfLines={1}
                              >
                                {moment(release_date).format('YYYY')}
                              </Text>

                              <MetaPopularity popularity={popularity} />
                            </>
                          );

                        case 'artist':
                          return (
                            <>
                              <Text
                                color={'text.base'}
                                fontSize={'sm'}
                                noOfLines={1}
                              >
                                {[
                                  ...(genres || ['No genres available'])
                                ]
                                  .splice(0, 2)
                                  .join(', ')}
                              </Text>

                              <MetaPopularity popularity={popularity} />
                            </>
                          );

                        case 'playlist':
                          return (
                            <>
                              <Text
                                color={'text.base'}
                                fontSize={'sm'}
                                noOfLines={1}
                              >
                                {utilPluralize('track', tracks?.total)}
                              </Text>
                            </>
                          );

                        case 'track':
                          return (
                            <>
                              <Text
                                color={'text.base'}
                                fontSize={'sm'}
                                noOfLines={1}
                              >
                                {capitalize(context?.type)}
                              </Text>
                            </>
                          );

                        default:
                          break;
                      }
                    })()}
                  </HStack>
                </>
              </VStack>
            </Flex>
          </Card>
        ) : (
          <Card>
            <MemoCardSpotifyEmptySkeleton type={type} />
          </Card>
        )}
      </Skeleton>
    </Box>
  );
};
