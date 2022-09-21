import { Flex, Heading, HStack, Input, Select } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { FormEvent, useContext, useTransition } from 'react';
import { IAlbum } from 'src/types/album';
import { DEBOUNCE_WAIT_FAST } from 'src/utils/constants';
import { LibraryAlbumsContext } from '../../LibraryAlbumsContext';

export function LibraryAlbumsHeader() {
  const { albums, albumsFiltered, setAlbumsFiltered } = useContext(
    LibraryAlbumsContext
  );

  const [_, startTransition] = useTransition();

  const handleOnChangeInput = (event: FormEvent<HTMLInputElement>) => {
    filterAlbumsByName(event.currentTarget.value);
  };

  const handleOnChangeSelect = (
    event: FormEvent<HTMLSelectElement>
  ) => {
    const sortProp = event.currentTarget.value as keyof IAlbum;
    sortAlbumsByProp(sortProp);
  };

  const filterAlbumsByName = debounce((value: string) => {
    const filtered = albumsFiltered?.filter((album) =>
      album.name?.toLowerCase()?.includes(value.toLowerCase())
    );

    startTransition(() => {
      value ? setAlbumsFiltered(filtered) : setAlbumsFiltered(albums);
    });
  }, DEBOUNCE_WAIT_FAST);

  const sortAlbumsByProp = (prop: keyof IAlbum) => {
    if (!albumsFiltered) return;

    const sorted = [...albumsFiltered].sort((a, b) => {
      if (!a[prop] || !b[prop]) return 0;

      const aProp = a[prop] as keyof IAlbum;
      const bProp = b[prop] as keyof IAlbum;

      if (prop === 'release_date') {
        return new Date(aProp) < new Date(bProp) ? -1 : 1;
      }

      return aProp < bProp ? -1 : 1;
    });

    startTransition(() => {
      setAlbumsFiltered(sorted);
    });
  };

  return (
    <Flex>
      <Heading fontSize={'2xl'}>Albums</Heading>

      {albumsFiltered && (
        <HStack spacing={2} ml={'auto'}>
          <Input
            placeholder={'Search in albums'}
            size={'sm'}
            variant={'filled'}
            onChange={handleOnChangeInput}
          ></Input>

          <Select
            size={'sm'}
            variant={'filled'}
            onChange={handleOnChangeSelect}
          >
            <option value="name">Name</option>
            <option value="release_date">Release date</option>
          </Select>
        </HStack>
      )}
    </Flex>
  );
}
