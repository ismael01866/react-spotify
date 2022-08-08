import { useRouter } from 'next/router';

import { Box, HStack, VStack } from '@chakra-ui/react';
import { Layout } from 'layout';

import {
  ArtistAvatar,
  ArtistBanner,
  ArtistMeta
} from 'src/features/artist';
import { useArtist } from 'src/lib/hooks/services/useArtist';
import { ButtonPlay } from 'src/components/Button/ButtonPlay';

export function Artist() {
  const router = useRouter();
  const { id } = router.query;

  const { artist, isLoading } = useArtist(id);

  return (
    <Layout>
      <Box mb={-56} pt={12}>
        <ArtistBanner artist={artist} isLoading={isLoading} />
      </Box>

      <Box p={12} pos={'relative'}>
        <HStack spacing={8}>
          <ArtistAvatar artist={artist} isLoading={isLoading} />

          <VStack alignItems={'flex-start'} spacing={8}>
            <ArtistMeta artist={artist} isLoading={isLoading} />

            <HStack>
              <ButtonPlay uri={artist.uri} opacity={1} />
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Layout>
  );
}
