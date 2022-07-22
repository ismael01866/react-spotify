import { useEffect, useState } from 'react';

import { SimpleGrid } from '@chakra-ui/react';
import { CardArtist } from 'src/components/Card/CardArtist';

import { IArtist } from 'src/types/artist';

export function FeaturedGrid() {
  const [artists, setArtists] = useState<IArtist[]>([]);

  useEffect(() => {
    fetchData().then((data) => {
      setArtists(data);
    });
  }, []);

  const fetchData = () => {
    return fetch('api/spotify/me/top/artists').then((res) =>
      res.json()
    );
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
      {artists.map((artist) => {
        return <CardArtist key={artist.id} artist={artist} />;
      })}
    </SimpleGrid>
  );
}
