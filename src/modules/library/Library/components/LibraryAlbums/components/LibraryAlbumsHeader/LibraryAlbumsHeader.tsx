import {
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select
} from '@chakra-ui/react';
import {
  FormEvent,
  startTransition,
  useContext,
  useState
} from 'react';
import { FaSearch } from 'react-icons/fa';
import { IAlbum } from 'src/types/album';
import { LibraryAlbumsContext } from '../../LibraryAlbumsContext';

export function LibraryAlbumsHeader() {
  const { albums, albumsFiltered, setAlbumsFiltered } = useContext(
    LibraryAlbumsContext
  );

  const [sortProp, setSortProp] = useState<keyof IAlbum>('name');

  const handleOnChangeInput = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    if (albums && value) {
      const filtered = filterAlbumsByName(albums, value);
      const sorted = sortAlbumsByProp(filtered, sortProp);

      startTransition(() => {
        setAlbumsFiltered(sorted);
      });

      return;
    }

    if (albums) {
      const sorted = sortAlbumsByProp(albums, sortProp);

      startTransition(() => {
        setAlbumsFiltered(sorted);
      });
    }
  };

  const handleOnChangeSelect = (
    event: FormEvent<HTMLSelectElement>
  ) => {
    const prop = event.currentTarget.value as keyof IAlbum;
    setSortProp(prop);

    if (albumsFiltered) {
      const sorted = sortAlbumsByProp(albumsFiltered, prop);
      setAlbumsFiltered(sorted);
    }
  };

  const filterAlbumsByName = (albums: IAlbum[], value: string) => {
    return albums?.filter((album) =>
      album.name?.toLowerCase()?.includes(value.toLowerCase())
    );
  };

  const sortAlbumsByProp = (albums: IAlbum[], prop: keyof IAlbum) => {
    if (!albums) return;

    const sorted = [...albums].sort((a, b) => {
      if (!a[prop] || !b[prop]) return 0;

      const aProp = a[prop] as keyof IAlbum;
      const bProp = b[prop] as keyof IAlbum;

      if (prop === 'release_date') {
        return new Date(aProp) < new Date(bProp) ? -1 : 1;
      }

      if (prop === 'popularity') {
        return aProp < bProp ? 1 : -1;
      }

      return aProp < bProp ? -1 : 1;
    });

    return sorted;
  };

  return (
    <HStack justifyContent={'space-between'}>
      <Heading fontSize={'2xl'}>Albums</Heading>

      <HStack
        ml={'auto'}
        spacing={2}
        visibility={albumsFiltered ? 'visible' : 'hidden'}
      >
        <InputGroup>
          <InputLeftElement mt={'1px'}>
            <Icon as={FaSearch} color={'text.muted'} />
          </InputLeftElement>
          <Input
            placeholder={'Search in albums'}
            variant={'filled'}
            onChange={handleOnChangeInput}
          ></Input>
        </InputGroup>

        <Select variant={'filled'} onChange={handleOnChangeSelect}>
          <option value="name">Name</option>
          <option value="release_date">Release date</option>
          <option value="popularity">Popularity</option>
        </Select>
      </HStack>
    </HStack>
  );
}
