import { SimpleGrid } from '@chakra-ui/react';
import { IAlbum } from 'src/types/album';
import { AlbumCard } from '../AlbumCard';

interface AlbumGridProps {
  albums: IAlbum[];
  [others: string]: any;
}

export function AlbumGrid(props: AlbumGridProps) {
  const { albums, ...others } = props;

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 6 }}
      spacing={4}
      {...others}
    >
      {albums?.map((album, index) => {
        return <AlbumCard key={album.id || index} album={album} />;
      })}
    </SimpleGrid>
  );
}
