import { Box, HStack, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { ButtonFollowArtist } from 'src/components/Button/ButtonFollow';
import { ButtonPlay } from 'src/components/Button/ButtonPlay';
import { ImageArtist } from 'src/components/Image/ImageArtist';
import { ArtistContext } from '../../ArtistContext';
import { ArtistBanner, ArtistMeta } from './components';

export function ArtistHeader() {
  const artist = useContext(ArtistContext);

  return (
    <Box minH={'2xs'} pos={'relative'}>
      <Box
        left={0}
        top={0}
        pos={'absolute'}
        w={'full'}
        sx={{ transform: 'scale(1.5)' }}
      >
        <ArtistBanner artist={artist} />
      </Box>

      <Box pos={'relative'}>
        <HStack spacing={8}>
          <Box boxSize={'3xs'} mt={8}>
            <ImageArtist artist={artist} />
          </Box>

          <VStack alignItems={'flex-start'} pt={6} spacing={8}>
            <ArtistMeta artist={artist} />

            <HStack spacing={2}>
              <ButtonPlay context_uri={artist.uri} />
              <ButtonFollowArtist artist={artist} />
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}
