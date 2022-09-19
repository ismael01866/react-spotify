import { Flex } from '@chakra-ui/react';
import {
  LibraryAlbumsContent,
  LibraryAlbumsHeader
} from './components';

export function LibraryAlbums() {
  return (
    <Flex flexDirection={'column'} gap={12}>
      <LibraryAlbumsHeader />
      <LibraryAlbumsContent />
    </Flex>
  );
}
