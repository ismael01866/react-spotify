import { Box, Flex, Heading, Input } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { FormEvent, useContext, useTransition } from 'react';
import { DEBOUNCE_WAIT_FAST } from 'src/utils/constants';
import { LibraryPlaylistsContext } from '../../LibraryPlaylistsContext';

export function LibraryPlaylistsHeader() {
  const { playlists, playlistsFiltered, setPlaylistsFiltered } =
    useContext(LibraryPlaylistsContext);

  const [_, startTransition] = useTransition();

  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    filterPlaylistsByName(event.currentTarget.value);
  };

  const filterPlaylistsByName = debounce((value: string) => {
    const filtered = playlistsFiltered?.filter((artist) =>
      artist.name?.toLowerCase()?.includes(value.toLowerCase())
    );

    startTransition(() => {
      value
        ? setPlaylistsFiltered(filtered)
        : setPlaylistsFiltered(playlists);
    });
  }, DEBOUNCE_WAIT_FAST);

  return (
    <Flex>
      <Heading fontSize={'2xl'}>Playlists</Heading>

      {playlistsFiltered && (
        <Box ml={'auto'}>
          <Input
            placeholder={'Search in playlists'}
            size={'sm'}
            variant={'filled'}
            onChange={handleOnChange}
          ></Input>
        </Box>
      )}
    </Flex>
  );
}
