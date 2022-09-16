import { Flex } from '@chakra-ui/react';
import {
  LibraryArtistsContent,
  LibraryArtistsHeader
} from './components';
export function LibraryArtists() {
  return (
    <Flex
      flexDirection={'column'}
      gap={12}
      height={'full'}
      overflow={'hidden'}
    >
      <LibraryArtistsHeader />
      <LibraryArtistsContent />
    </Flex>
  );
}
