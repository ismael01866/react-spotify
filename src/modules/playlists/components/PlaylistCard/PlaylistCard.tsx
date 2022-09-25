import { Box, Heading, Link } from '@chakra-ui/react';
import { Card } from 'components/Card';
import { default as NextLink } from 'next/link';
import { useContext, useRef } from 'react';
import {
  CardButtonPlay,
  CardMeta
} from 'src/components/Card/components';
import { Skeleton } from 'src/components/Skeleton';
import { LayoutGridContext } from 'src/layout/components/LayoutGrid/LayoutGridContext';
import { IPlaylist } from 'src/types/playlist';
import { useOnScreen } from 'src/utils/hooks/dom';
import { PlaylistImage } from '../PlaylistImage';

interface PlaylistCardProps {
  playlist: IPlaylist;
  [others: string]: any;
}

export function PlaylistCard(props: PlaylistCardProps) {
  const { playlist, ...others } = props;
  const { id, name, uri } = playlist;

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
              <NextLink href={`/playlists/${id}`} passHref>
                <Link>
                  <PlaylistImage playlist={playlist} />
                </Link>
              </NextLink>

              <CardButtonPlay context_uri={uri} />
            </Box>

            <CardMeta>
              <Heading fontSize={'sm'} noOfLines={1}>
                {name}
              </Heading>
            </CardMeta>
          </Card>
        </Skeleton>
      ) : (
        <Skeleton minH={80} startColor={''} />
      )}
    </Box>
  );
}
