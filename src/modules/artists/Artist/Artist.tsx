import { Flex } from '@chakra-ui/react';
import { ArtistContent, ArtistHeader } from 'src/features/artist';

export function Artist() {
  return (
    <Flex flexDirection={'column'} gap={12}>
      <ArtistHeader />
      <ArtistContent />
    </Flex>
  );
}
