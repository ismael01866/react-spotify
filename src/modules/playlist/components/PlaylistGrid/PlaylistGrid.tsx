import { SimpleGrid } from '@chakra-ui/react';

import { CardSpotify } from 'components/Card/CardSpotify';
import { IPlaylist } from 'types/playlist';

interface PlaylistGridProps {
  playlists: IPlaylist[];
  [others: string]: any;
}

export function PlaylistGrid(props: PlaylistGridProps) {
  const { playlists, ...others } = props;

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      gap={4}
      {...others}
    >
      {playlists?.map((playlist, index) => {
        return (
          <CardSpotify
            key={playlist.id || index}
            type={'playlist'}
            data={playlist}
          />
        );
      })}
    </SimpleGrid>
  );
}
