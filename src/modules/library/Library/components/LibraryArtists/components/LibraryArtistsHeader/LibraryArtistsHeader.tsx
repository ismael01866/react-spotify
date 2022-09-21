import { Box, Flex, Heading, Input } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { FormEvent, useContext, useTransition } from 'react';
import { DEBOUNCE_WAIT_FAST } from 'src/utils/constants';
import { LibraryArtistsContext } from '../../LibraryArtistsContext';

export function LibraryArtistsHeader() {
  const { artists, artistsFiltered, setArtistsFiltered } = useContext(
    LibraryArtistsContext
  );

  const [_, startTransition] = useTransition();

  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    filterArtistsByName(event.currentTarget.value);
  };

  const filterArtistsByName = debounce((value: string) => {
    const filtered = artistsFiltered?.filter((artist) =>
      artist.name?.toLowerCase()?.includes(value.toLowerCase())
    );

    startTransition(() => {
      value
        ? setArtistsFiltered(filtered)
        : setArtistsFiltered(artists);
    });
  }, DEBOUNCE_WAIT_FAST);

  return (
    <Flex>
      <Heading fontSize={'2xl'}>Artists</Heading>

      {artistsFiltered && (
        <Box ml={'auto'}>
          <Input
            placeholder={'Search in artists'}
            size={'sm'}
            variant={'filled'}
            onChange={handleOnChange}
          ></Input>
        </Box>
      )}
    </Flex>
  );
}
