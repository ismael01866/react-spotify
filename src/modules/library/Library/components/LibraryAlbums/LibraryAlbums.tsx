import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LibraryAlbumsContext } from 'src/state';
import { IAlbum } from 'src/types/album';
import { useMeAlbumsAll } from 'src/hooks/services';
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
