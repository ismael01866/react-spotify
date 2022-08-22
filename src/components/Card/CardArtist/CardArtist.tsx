import {
  AspectRatio,
  Box,
  Heading,
  Image,
  Link,
  Skeleton
} from '@chakra-ui/react';
import { Card } from 'components/Card';
import { default as NextLink } from 'next/link';
import { IArtist } from 'src/types/artist';
import { CardButtonPlay, CardMeta } from '../components';

export interface CardArtistProps {
  artist: IArtist;
  [others: string]: any;
}

export function CardArtist(props: CardArtistProps) {
  const { artist, ...others } = props;
  const { id, name, uri, images } = artist;

  return (
    <Skeleton isLoaded={!!artist.id}>
      <Card role={'group'} {...others}>
        <Box boxShadow={'base'} position={'relative'}>
          <AspectRatio overflow={'hidden'} ratio={4 / 3}>
            <NextLink href={`/artists/${id}`} passHref>
              <Link>
                <Image
                  alt={name}
                  src={images?.[0]?.url}
                  fallback={<Skeleton startColor={''} />}
                />
              </Link>
            </NextLink>
          </AspectRatio>

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
