import { Box, HStack, Skeleton, VStack } from '@chakra-ui/react';
import { ButtonPlay } from 'src/components/Button/ButtonPlay';
import { useArtist } from 'src/lib/hooks/services';
import {
  ArtistAvatar,
  ArtistBanner,
  ArtistButtonFollow,
  ArtistMeta
} from './components';

export interface ArtistHeaderProps {
  artistID: string | string[];
}

export function ArtistHeader(props: ArtistHeaderProps) {
  const { artistID } = props;
  const { artist, isLoading } = useArtist(artistID);

  return (
    <Skeleton isLoaded={!isLoading}>
      {artist && (
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
      )}
    </Skeleton>
  );
}
