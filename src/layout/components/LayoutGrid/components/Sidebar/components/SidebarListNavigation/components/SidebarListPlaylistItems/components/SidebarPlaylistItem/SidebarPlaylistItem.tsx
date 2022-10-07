import {
  Avatar,
  IconButton,
  ListItem,
  Tooltip
} from '@chakra-ui/react';
import { capitalize } from 'lodash';
import { default as NextLink } from 'next/link';
import { IPlaylist } from 'src/types/playlist';

interface SidebarPlaylistItemProps {
  item: IPlaylist;
}

export const SidebarPlaylistItem = (
  props: SidebarPlaylistItemProps
) => {
  const { item } = props;
  const { id, name = '', images } = item;

  return (
    <Tooltip label={capitalize(name)} placement={'end'}>
      <ListItem>
        <NextLink href={`/playlists/${id}`}>
          <IconButton
            aria-label={name}
            color={'text.muted'}
            filter="grayscale(1)"
            variant={'ghost'}
            _hover={{
              color: 'text.base',
              filter: 'unset'
            }}
          >
            <Avatar
              borderRadius={'base'}
              name={name}
              src={images?.[0]?.url}
              size={'sm'}
            />
          </IconButton>
        </NextLink>
      </ListItem>
    </Tooltip>
  );
};
