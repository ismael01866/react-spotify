import { Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import { CollectionTracksContext } from 'src/state';
import { CollectionTracksContent, CollectionTracksHeader } from './components';

export function CollectionTracks() {
  useContext(CollectionTracksContext);

  return (
    <Flex flexDirection={'column'} gap={12}>
      <CollectionTracksContext.Provider value={{ chunkSize: 20 }}>
        <CollectionTracksHeader />
        <CollectionTracksContent />
      </CollectionTracksContext.Provider>
    </Flex>
  );
}
