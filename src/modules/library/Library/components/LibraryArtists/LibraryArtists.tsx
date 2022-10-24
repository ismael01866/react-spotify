import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';

import { useMeArtistsAll } from 'hooks/services';
import { LibraryArtistsContext } from 'state';
import { IArtist } from 'types/artist';

import { LibraryArtistsContent, LibraryArtistsHeader } from './components';

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
