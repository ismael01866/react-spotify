import { ArtistGridRelatedArtists } from './components';

export function ArtistRelatedArtists() {
  return (
    <>
      <ArtistGridRelatedArtists
        limit={6}
        columns={{ base: 1, sm: 2, md: 3 }}
      />
    </>
  );
}
