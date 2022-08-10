import { useRouter } from 'next/router';

import { Box, HStack, VStack } from '@chakra-ui/react';

import { ButtonPlay } from 'src/components/Button/ButtonPlay';
import {
  ArtistAvatar,
  ArtistBanner,
  ArtistButtonFollow,
  ArtistMeta
} from 'src/features/artist';

import { useArtist } from 'src/lib/hooks/services/useArtist';

export function Artist() {
  const router = useRouter();

  const { id } = router.query;
  const { artist } = useArtist(id);

  return (
    (artist && (
      <>
        <Box mb={-56}>
          <ArtistBanner artist={artist} />
        </Box>

        <Box pos={'relative'}>
          <HStack spacing={8}>
            <ArtistAvatar artist={artist} />

            <VStack alignItems={'flex-start'} spacing={8}>
              <ArtistMeta artist={artist} />

              <HStack spacing={4}>
                <ButtonPlay uri={artist.uri} />
                <ArtistButtonFollow artist={artist} />
              </HStack>
            </VStack>
          </HStack>
        </Box>
      </>
    )) || <></>
  );
}
