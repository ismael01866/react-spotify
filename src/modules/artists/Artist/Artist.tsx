import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  ArtistContent,
  ArtistContext,
  ArtistHeader
} from 'src/features/artist';

export function Artist() {
  const router = useRouter();

  const { id: artistID } = router.query;

  return (
    <Flex flexDirection={'column'} gap={12}>
      {artistID && (
        <ArtistContext.Provider value={{ artistID }}>
          <ArtistHeader />
          <ArtistContent />
        </ArtistContext.Provider>
      )}
    </Flex>
  );
}
