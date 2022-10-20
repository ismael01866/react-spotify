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
import { LibraryPlaylistsContext } from 'src/state';
import { IPlaylist } from 'src/types/playlist';

export function LibraryPlaylistsHeader() {
  const { playlists, playlistsFiltered, setPlaylistsFiltered } =
    useContext(LibraryPlaylistsContext);

  const [_, startTransition] = useTransition();

  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    if (playlists && value) {
      const filtered = filterPlaylistsByName(playlists, value);

      startTransition(() => {
        setPlaylistsFiltered(filtered);
      });

      return;
    }

    setPlaylistsFiltered(playlists);
  };

  const filterPlaylistsByName = (
    playlists: IPlaylist[],
    value: string
  ) => {
    return playlists?.filter((artist) =>
      artist.name?.toLowerCase()?.includes(value.toLowerCase())
    );
  };

  return (
    <HStack justifyContent={'space-between'}>
      <Heading fontSize={'2xl'}>Playlists</Heading>

      <Box visibility={playlistsFiltered ? 'visible' : 'hidden'}>
        <InputGroup>
          <InputLeftElement mt={'1px'}>
            <Icon as={FaSearch} color={'text.muted'} />
          </InputLeftElement>
          <Input
            placeholder={'Search in playlists'}
            variant={'filled'}
            onChange={handleOnChange}
          ></Input>
        </InputGroup>
      </Box>
    </HStack>
  );
}
