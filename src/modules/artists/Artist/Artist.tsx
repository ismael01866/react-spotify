import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ArtistContent, ArtistHeader } from 'src/features/artist';

import { useArtist } from 'src/lib/hooks/services/useArtist';

export function Artist() {
  const router = useRouter();

  const { id } = router.query;
  const { artist } = useArtist(id);

  return (
    (artist && (
      <Flex flexDirection={'column'} gap={12}>
        <ArtistHeader artist={artist} />
        <ArtistContent />
      </Flex>
    )) || <></>
  );
}
