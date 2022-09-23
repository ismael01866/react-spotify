import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IArtist } from 'src/types/artist';
import { useMeArtistsAll } from 'src/utils/hooks/services';
import {
  LibraryArtistsContent,
  LibraryArtistsHeader
} from './components';
import { LibraryArtistsContext } from './LibraryArtistsContext';

export function LibraryArtists() {
  const { artists } = useMeArtistsAll({ sort: 'name' });

  const [artistsFiltered, setArtistsFiltered] = useState<IArtist[]>();

  useEffect(() => {
    if (!artists) return;

    setArtistsFiltered(artists);
  }, [artists]);

  return (
    <Flex flexDirection={'column'} gap={12}>
      <LibraryArtistsContext.Provider
        value={{ artists, artistsFiltered, setArtistsFiltered }}
      >
        <LibraryArtistsHeader />
        <LibraryArtistsContent />
      </LibraryArtistsContext.Provider>
    </Flex>
  );
}
