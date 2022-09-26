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
import { useCallback, useContext, useRef } from 'react';
import { MetaPopularity } from 'src/components/Meta';
import { Skeleton } from 'src/components/Skeleton';
import { LayoutGridContext } from 'src/layout/components/LayoutGrid/LayoutGridContext';
import {
  AlbumEmptySkeleton,
  AlbumImage
} from 'src/modules/albums/components';
import {
  ArtistEmptySkeleton,
  ArtistImage
} from 'src/modules/artists/components';
import {
  PlaylistEmptySkeleton,
  PlaylistImage
} from 'src/modules/playlists/components';
import {
  TrackEmptySkeleton,
  TrackImage
} from 'src/modules/tracks/components';
import { IAlbum } from 'src/types/album';
import { IArtist } from 'src/types/artist';
import { IPlaylist } from 'src/types/playlist';
import { ITrack } from 'src/types/track';
import { utilPluralize } from 'src/utils/helpers';
import { useOnScreen } from 'src/utils/hooks/dom';
import { Card } from '../Card';
import { CardButtonPlay } from '../components';

interface CardSpotifyProps {
  type: 'album' | 'artist' | 'playlist' | 'track';
  data: IAlbum | IArtist | IPlaylist | ITrack;
  [others: string]: any;
}

export const CardSpotify = (props: CardSpotifyProps) => {
  const { type, data, ...others } = props;

  const { id, name, uri } = data;

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

  const getURLByType = useCallback((type: CardSpotifyProps['type']) => {
    if (!type) return;

    switch (type) {
      case 'track':
      case 'album':
        return `/albums`;

      case 'artist':
        return `/artists`;

      case 'playlist':
        return `/playlists`;

      default:
        break;
    }
  }, []);

  const getNameByTrackContext = useCallback((track: ITrack) => {
    if (!track.context) return;

    const {
      context: { type }
    } = track;

    switch (type) {
      case 'album':
        return track?.album?.name;

      case 'artist':
        return track?.artists?.[0]?.name;

      case 'track':
        return track?.name;

      case 'playlist':
        return track?.playlist?.name;

      default:
        break;
    }
  }, []);

  return (
    <Box ref={containerEl}>
      <Skeleton isLoaded={!!id}>
        <Card position={'relative'} role={'group'} {...others}>
          <Box boxShadow={'dark-lg'} position={'relative'}>
            {isIntersecting ? (
              <>
                <NextLink href={`${getURLByType(type)}/${id}`} passHref>
                  <Link>
                    {(() => {
                      switch (type) {
                        case 'album':
                          return <AlbumImage album={data as IAlbum} />;

                        case 'artist':
                          return (
                            <ArtistImage artist={data as IArtist} />
                          );

                        case 'playlist':
                          return (
                            <PlaylistImage
                              playlist={data as IPlaylist}
                            />
                          );

                        case 'track':
                          return <TrackImage track={data as ITrack} />;

                        default:
                          break;
                      }
                    })()}
                  </Link>
                </NextLink>

                {(() => {
                  if (type === 'track') {
                    switch (context?.type) {
                      case 'track':
                        return <CardButtonPlay uri={uri} />;

                      default:
                        return (
                          <CardButtonPlay context_uri={context?.uri} />
                        );
                    }
                  }

                  return <CardButtonPlay context_uri={uri} />;
                })()}
              </>
            ) : (
              <>
                {(() => {
                  switch (type) {
                    case 'album':
                      return <AlbumEmptySkeleton />;

                    case 'artist':
                      return <ArtistEmptySkeleton />;

                    case 'playlist':
                      return <PlaylistEmptySkeleton />;

                    case 'track':
                      return <TrackEmptySkeleton />;

                    default:
                      break;
                  }
                })()}
              </>
            )}
          </Box>

          <Flex bg={'bg.900'} mt={4} w={'full'}>
            <VStack alignItems={'flex-start'} noOfLines={1} spacing={1}>
              <>
                {(() => {
                  switch (type) {
                    case 'track':
                      return (
                        <Heading fontSize={'sm'} noOfLines={1}>
                          {getNameByTrackContext(data)}
                        </Heading>
                      );

                    default:
                      return (
                        <Heading fontSize={'sm'} noOfLines={1}>
                          {name}
                        </Heading>
                      );
                  }
                })()}

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
                              {[...(genres || ['No genres available'])]
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
      </Skeleton>
    </Box>
  );
};
