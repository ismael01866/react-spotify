import { SimpleGrid } from '@chakra-ui/react';
import { useContext } from 'react';
import { CardAlbum } from 'src/components/Card/CardAlbum';
import { ArtistContext } from 'src/features/artist/ArtistContext';
import { useArtistAlbums } from 'src/lib/hooks/services';

export interface ArtistGridSinglesProps {
  limit?: number;
  [others: string]: any;
}

export function ArtistGridSingles(props: ArtistGridSinglesProps) {
  const { artistID } = useContext(ArtistContext);

  const { limit, ...others } = props;
  const { albums, isLoading } = useArtistAlbums(artistID, {
    limit,
    include_groups: 'single'
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