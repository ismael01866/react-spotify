import { SimpleGrid } from '@chakra-ui/react';
import { CardAlbum } from 'src/components/Card/CardAlbum';
import { useArtistAlbums } from 'src/utils/hooks/services';

export interface ArtistGridAlbumsProps {
  artistID: string | string[];
  limit?: number;
  [others: string]: any;
}

export function ArtistGridAlbums(props: ArtistGridAlbumsProps) {
  const { artistID, limit, ...others } = props;

  const { albums, isLoading } = useArtistAlbums(artistID, {
    limit,
    include_groups: 'album'
  });

  const skeletonData = new Array(limit).fill('');
  const data = isLoading ? skeletonData : albums;

  return (
    <SimpleGrid spacing={4} {...others}>
      {data?.map((album, index) => {
        return <CardAlbum key={album.id || index} album={album} />;
      })}
    </SimpleGrid>
  );
}
