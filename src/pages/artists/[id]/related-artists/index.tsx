import type { GetServerSideProps, NextApiRequest, NextPage } from 'next';

import { ArtistRelatedArtists } from 'modules/artist/ArtistRelatedArtists';
import { ArtistRelatedArtistsContext } from 'state';
import { IArtist } from 'types/artist';
import { fetchWithToken } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

interface ArtistRelatedArtistsPageProps {
  data: IArtist[];
}

const ArtistRelatedArtistsPage: NextPage<ArtistRelatedArtistsPageProps> = (
  props
) => {
  const { data } = props;

  return (
    <ArtistRelatedArtistsContext.Provider value={data}>
      <ArtistRelatedArtists />
    </ArtistRelatedArtistsContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query
}) => {
  const url = utilWithQueryParams(
    `${process.env.NEXT_PUBLIC_SPOTIFY_API}/artists/${query.id}/related-artists`
  );

  const { artists: data }: { artists: IArtist[] } = await fetchWithToken(
    req as NextApiRequest,
    url
  );

  return {
    props: { data }
  };
};

export default ArtistRelatedArtistsPage;
