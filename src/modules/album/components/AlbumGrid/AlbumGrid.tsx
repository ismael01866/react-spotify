import { SimpleGrid } from '@chakra-ui/react';

import { CardSpotify } from 'components/Card/CardSpotify';
import { IAlbum } from 'types/album';

interface AlbumGridProps {
  albums: IAlbum[];
  [others: string]: any;
}

export function AlbumGrid(props: AlbumGridProps) {
  const { albums, ...others } = props;

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      gap={4}
      {...others}
    >
      {albums?.map((album, index) => {
        return (
          <CardSpotify key={album.id || index} type={'album'} data={album} />
        );
      })}
    </SimpleGrid>
  );
}
