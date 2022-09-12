import { SimpleGrid } from '@chakra-ui/react';
import { PlaylistCard } from 'src/modules/playlists/components';
import { IPlaylist } from 'src/types/playlist';

export interface PlaylistGridProps {
  data: IPlaylist[];
  [others: string]: any;
}

export function PlaylistGrid(props: PlaylistGridProps) {
  const { data, ...others } = props;

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 6 }}
      spacing={4}
      {...others}
    >
      {data?.map((playlist, index) => {
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
