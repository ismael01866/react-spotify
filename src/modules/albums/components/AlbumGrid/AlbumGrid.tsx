import { SimpleGrid } from '@chakra-ui/react';
import { AlbumCard } from 'src/modules/albums/components';
import { IAlbum } from 'src/types/album';

export interface AlbumGridProps {
  data: IAlbum[];
  [others: string]: any;
}

export function AlbumGrid(props: AlbumGridProps) {
  const { data, ...others } = props;

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 6 }}
      spacing={4}
      {...others}
    >
      {data?.map((album, index) => {
        return <AlbumCard key={album.id || index} album={album} />;
      })}
    </SimpleGrid>
  );
}