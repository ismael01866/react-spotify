import { Box, HStack, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { ButtonPlay } from 'src/components/Button/ButtonPlay';
import { PlaylistImage } from 'src/modules/playlists/components';
import { PlaylistContext } from '../../PlaylistContext';
import { PlaylistMeta } from './components';

export function PlaylistHeader() {
  const playlist = useContext(PlaylistContext);

  return (
    <Box minH={'2xs'} pos={'relative'}>
      <HStack spacing={8}>
        <Box boxSize={'3xs'} mt={8}>
          <PlaylistImage playlist={playlist} />
        </Box>

        <VStack alignItems={'flex-start'} pt={6} spacing={8}>
          <PlaylistMeta playlist={playlist} />

          <HStack spacing={2}>
            <ButtonPlay context_uri={playlist.uri} />
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
}
