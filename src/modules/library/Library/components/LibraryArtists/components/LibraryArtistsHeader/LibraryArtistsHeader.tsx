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
import { IArtist } from 'src/types/artist';
import { utilSetDelayedState } from 'src/utils/helpers';
import { LibraryArtistsContext } from '../../LibraryArtistsContext';

export function LibraryArtistsHeader() {
  const { artists, artistsFiltered, setArtistsFiltered } = useContext(
    LibraryArtistsContext
  );

  const [sortProp, setSortProp] = useState<keyof IArtist>('name');

  const handleOnChangeInput = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    if (artists && value) {
      const filtered = filterArtistsByName(artists, value);

      startTransition(() => {
        setArtistsFiltered(filtered);
      });

      return;
    }

    if (artists) {
      const sorted = sortArtistsByProp(artists, sortProp);

      startTransition(() => {
        setArtistsFiltered(sorted);
      });
    }
  };

  const handleOnChangeSelect = (
    event: FormEvent<HTMLSelectElement>
  ) => {
    if (!artistsFiltered) return;

    const prop = event.currentTarget.value as keyof IArtist;
    setSortProp(prop);

    const sorted = sortArtistsByProp(artistsFiltered, prop);
    if (!sorted) return;

    setArtistsFiltered([]);
    utilSetDelayedState(sorted, setArtistsFiltered);
  };

  const filterArtistsByName = (artists: IArtist[], value: string) => {
    return artists?.filter((artist) =>
      artist.name?.toLowerCase()?.includes(value.toLowerCase())
    );
  };

  const sortArtistsByProp = (
    artists: IArtist[],
    prop: keyof IArtist
  ) => {
    if (!artists) return;

    const sorted = [...artists].sort((a, b) => {
      if (!a[prop] || !b[prop]) return 0;

      const aProp = a[prop] as keyof IArtist;
      const bProp = b[prop] as keyof IArtist;

      if (prop === 'popularity') {
        return aProp < bProp ? 1 : -1;
      }

      return aProp < bProp ? -1 : 1;
    });

    return sorted;
  };

  return (
    <HStack justifyContent={'space-between'}>
      <Heading fontSize={'2xl'}>Artists</Heading>

      <HStack
        ml={'auto'}
        spacing={2}
        visibility={artistsFiltered ? 'visible' : 'hidden'}
      >
        <InputGroup>
          <InputLeftElement mt={'1px'}>
            <Icon as={FaSearch} color={'text.muted'} />
          </InputLeftElement>

          <Input
            placeholder={'Search in artists'}
            variant={'filled'}
            onChange={handleOnChangeInput}
          ></Input>
        </InputGroup>

        <Select variant={'filled'} onChange={handleOnChangeSelect}>
          <option value="name">Name</option>
          <option value="popularity">Popularity</option>
        </Select>
      </HStack>
    </HStack>
  );
}
