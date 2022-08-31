import { SimpleGrid } from '@chakra-ui/react';
import { AlbumCard } from 'src/modules/albums/components/AlbumCard';
import { IAlbum } from 'src/types/album';

export interface ArtistGridSinglesProps {
  data: IAlbum[];
  [others: string]: any;
}

export function ArtistGridSingles(props: ArtistGridSinglesProps) {
  const { data, ...others } = props;

  return (
    <SimpleGrid spacing={4} {...others}>
      {data?.map((album, index) => {
        return <AlbumCard key={album.id || index} album={album} />;
      })}
    </SimpleGrid>
  );
}
