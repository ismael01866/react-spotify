import { Box, HStack, Skeleton, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { ButtonPlay } from 'src/components/Button/ButtonPlay';
import { useArtist } from 'src/lib/hooks/services';
import { ArtistContext } from '../ArtistContext';
import {
  ArtistAvatar,
  ArtistBanner,
  ArtistButtonFollow,
  ArtistMeta
} from './components';

export function ArtistHeader() {
  const { artistID } = useContext(ArtistContext);
  const { artist = {}, isLoading } = useArtist(artistID);

  return (
    <Skeleton isLoaded={!isLoading}>
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
            <Box mt={8}>
              <ArtistAvatar artist={artist} />
            </Box>

            <VStack alignItems={'flex-start'} pt={6} spacing={8}>
              <ArtistMeta artist={artist} />

              <HStack spacing={2}>
                <ButtonPlay context_uri={artist.uri} />
                <ArtistButtonFollow artist={artist} />
              </HStack>
            </VStack>
          </HStack>
        </Box>
      </Box>
    </Skeleton>
  );
}
