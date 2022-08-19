import {
  AspectRatio,
  Box,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
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
    <LinkBox>
      <Card role={'group'} {...others}>
        <NextLink href={`/artists/${id}`} passHref>
          <LinkOverlay>
            <Box boxShadow={'base'} position={'relative'}>
              <AspectRatio overflow={'hidden'} ratio={4 / 3}>
                <Image
                  alt={name}
                  src={images?.[0].url}
                  fallback={<Skeleton />}
                />
              </AspectRatio>

              <CardButtonPlay context_uri={uri} />
            </Box>
          </LinkOverlay>
        </NextLink>

        <CardMeta>
          <Heading fontSize={'sm'} noOfLines={1}>
            {name}
          </Heading>
        </CardMeta>
      </Card>
    </LinkBox>
  );
}
