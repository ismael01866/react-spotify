import { random } from 'lodash';
import type { GetServerSideProps, NextApiRequest, NextPage } from 'next';

import { Home } from 'modules/home';
import { HomeContext } from 'state';
import { IArtist } from 'types/artist';
import { ITrack } from 'types/track';
import { fetchWithToken } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

interface HomePageProps {
  artist: IArtist;
}

const HomePage: NextPage<HomePageProps> = (props) => {
  const { artist } = props;

  return (
    <HomeContext.Provider value={{ artist }}>
      <Home />
    </HomeContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1, stale-while-revalidate=59'
  );

  // Get top artists

  const topArtistsURL = utilWithQueryParams(
    `${process.env.NEXT_PUBLIC_SPOTIFY_API}/me/top/artists`,
    {
      limit: 5 // 5 is the max supported
    }
  );

  const { items }: { items: IArtist[] } = await fetchWithToken(
    req as NextApiRequest,
    topArtistsURL
  );

  // Get recommendations

  const limit = 20;
  const seed_artists = items.map((item) => item.id).join(',');

  const recommendationsURL = utilWithQueryParams(
    `${process.env.NEXT_PUBLIC_SPOTIFY_API}/recommendations`,
    {
      limit,
      seed_artists
    }
  );

  const { tracks }: { tracks: ITrack[] } = await fetchWithToken(
    req as NextApiRequest,
    recommendationsURL
  );

  // Get artist info

  let artistID;

  while (!artistID) {
    artistID = tracks[random(1, limit)]?.artists?.[0]?.id;
  }

  const artistsURL = `${process.env.NEXT_PUBLIC_SPOTIFY_API}/artists/${artistID}`;

  const artist: IArtist = await fetchWithToken(
    req as NextApiRequest,
    artistsURL
  );

  return {
    props: { artist }
  };
};

export default HomePage;
