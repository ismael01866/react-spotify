import { Box, HStack, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ButtonPlay } from 'src/components/Button/ButtonPlay';
import { useArtist } from 'src/lib/hooks/services';
import {
  ArtistAvatar,
  ArtistBanner,
  ArtistButtonFollow,
  ArtistMeta
} from './components';

export function ArtistHeader() {
  const router = useRouter();

  const { id } = router.query;
  const { artist } = useArtist(id);

  return (
    (artist && (
      <Box pos={'relative'}>
        <Box
          className={'box'}
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
    )) || <></>
  );
}
