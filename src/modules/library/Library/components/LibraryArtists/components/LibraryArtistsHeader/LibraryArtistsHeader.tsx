import {
  Box,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { FormEvent, useContext, useTransition } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IArtist } from 'src/types/artist';
import { LibraryArtistsContext } from '../../LibraryArtistsContext';

export function LibraryArtistsHeader() {
  const { artists, artistsFiltered, setArtistsFiltered } = useContext(
    LibraryArtistsContext
  );

  const [_, startTransition] = useTransition();

  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    if (artists && value) {
      const filtered = filterArtistsByName(artists, value);

      startTransition(() => {
        setArtistsFiltered(filtered);
      });

      return;
    }

    setArtistsFiltered(artists);
  };

  const filterArtistsByName = (artists: IArtist[], value: string) => {
    return artists?.filter((artist) =>
      artist.name?.toLowerCase()?.includes(value.toLowerCase())
    );
  };

  return (
    <HStack justifyContent={'space-between'}>
      <Heading fontSize={'2xl'}>Artists</Heading>

      <Box visibility={artistsFiltered ? 'visible' : 'hidden'}>
        <InputGroup>
          <InputLeftElement mt={'1px'}>
            <Icon as={FaSearch} color={'text.muted'} />
          </InputLeftElement>

          <Input
            placeholder={'Search in artists'}
            variant={'filled'}
            onChange={handleOnChange}
          ></Input>
        </InputGroup>
      </Box>
    </HStack>
  );
}
