import { Box, HStack, Image, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { ButtonPlay } from 'src/components/Button/ButtonPlay';
import { HeaderBanner, HeaderMetaImage } from 'src/components/Header';
import {
  ArtistButtonFollow,
  ArtistEmptySkeleton
} from 'src/modules/artists/components';
import { ArtistContext } from 'src/state';
import { ArtistMeta } from './components';

export function ArtistHeader() {
  const artist = useContext(ArtistContext);
  const { images, name } = artist;

  return (
    <Box pos={'relative'} mx={-12} mt={-12}>
      <Box boxSize={'full'} overflow={'hidden'} pos={'absolute'}>
        <HeaderBanner>
          <Image src={images?.[0]?.url} alt={name} />
        </HeaderBanner>
      </Box>

      <Box px={12} pt={24} pos={'relative'}>
        <HStack spacing={8}>
          <HeaderMetaImage mb={-4}>
            <Image
              alt={name}
              src={images?.[0]?.url}
              fallback={<ArtistEmptySkeleton />}
            />
          </HeaderMetaImage>

          <VStack alignItems={'flex-start'} spacing={8}>
            <ArtistMeta artist={artist} />
            <HStack spacing={2}>
              <ButtonPlay context_uri={artist.uri} />
              <ArtistButtonFollow artist={artist} />
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}
