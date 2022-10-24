import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';

import { useMeAlbumsAll } from 'hooks/services';
import { LibraryAlbumsContext } from 'state';
import { IAlbum } from 'types/album';

import { LibraryAlbumsContent, LibraryAlbumsHeader } from './components';

export function LibraryAlbums() {
  const { albums } = useMeAlbumsAll({ sort: 'name' });

  const [albumsFiltered, setAlbumsFiltered] = useState<IAlbum[]>();

  useEffect(() => {
    if (!albums) return;

    setAlbumsFiltered(albums);
  }, [albums]);

  return (
    <Flex flexDirection={'column'} gap={12}>
      <LibraryAlbumsContext.Provider
        value={{ albums, albumsFiltered, setAlbumsFiltered }}
      >
        <LibraryAlbumsHeader />
        <LibraryAlbumsContent />
      </LibraryAlbumsContext.Provider>
    </Flex>
  );
}
