import { Box, Heading, Link } from '@chakra-ui/react';
import { Card } from 'components/Card';
import { default as NextLink } from 'next/link';
import {
  CardButtonPlay,
  CardMeta
} from 'src/components/Card/components';
import { Skeleton } from 'src/components/Skeleton';
import { IPlaylist } from 'src/types/playlist';
import { PlaylistImage } from '../PlaylistImage';

interface PlaylistCardProps {
  playlist: IPlaylist;
  [others: string]: any;
}

export function PlaylistCard(props: PlaylistCardProps) {
  const { playlist, ...others } = props;
  const { id, name, uri } = playlist;

  return (
    <Skeleton isLoaded={!!id}>
      <Card role={'group'} {...others}>
        <Box boxShadow={'base'} position={'relative'}>
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
  );
}
