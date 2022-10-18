import { Box, Image } from '@chakra-ui/react';
import { ArtistEmptySkeleton } from 'src/modules/artists/components';
import { IArtist } from 'src/types/artist';

interface HomeMetaProps {
  artist: IArtist;
}

export function HomeMetaImage(props: HomeMetaProps) {
  const { artist } = props;

  return (
    <Box
      borderRadius={'lg'}
      boxShadow={'dark-lg'}
      h={'2xs'}
      mb={-8}
      overflow={'hidden'}
      top={0}
      pos={'relative'}
      w={'4xs'}
    >
      <Image
        alt={artist.name}
        src={artist?.images?.[0]?.url}
        fallback={<ArtistEmptySkeleton />}
        h={'full'}
        objectFit={'cover'}
      />
    </Box>
  );
}
