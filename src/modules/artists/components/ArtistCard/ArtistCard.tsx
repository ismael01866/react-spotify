import { Box, Heading, Link } from '@chakra-ui/react';
import { Card } from 'components/Card';
import { default as NextLink } from 'next/link';
import {
  CardButtonPlay,
  CardMeta
} from 'src/components/Card/components';
import { Skeleton } from 'src/components/Skeleton';
import { IArtist } from 'src/types/artist';
import { ArtistImage } from '../ArtistImage';

interface ArtistCardProps {
  artist: IArtist;
  [others: string]: any;
}

export function ArtistCard(props: ArtistCardProps) {
  const { artist, ...others } = props;
  const { id, name, uri } = artist;

  return (
    <Skeleton isLoaded={!!id}>
      <Card role={'group'} {...others}>
        <Box boxShadow={'base'} position={'relative'}>
          <NextLink href={`/artists/${id}`} passHref>
            <Link>
              <ArtistImage artist={artist} />
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
