import { SimpleGrid } from '@chakra-ui/react';
import { IPlaylist } from 'src/types/playlist';
import { PlaylistCard } from '../PlaylistCard';

interface PlaylistGridProps {
  playlists: IPlaylist[];
  [others: string]: any;
}

export function PlaylistGrid(props: PlaylistGridProps) {
  const { playlists, ...others } = props;

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 6 }}
      spacing={4}
      {...others}
    >
      {playlists?.map((playlist, index) => {
        return (
          <PlaylistCard
            key={playlist.id || index}
            playlist={playlist}
          />
        );
      })}
    </SimpleGrid>
  );
}
