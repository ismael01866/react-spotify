import type { NextApiRequest, NextPage } from 'next';
import { GetServerSideProps } from 'next';

import { UserMeTopArtists } from 'modules/user';
import { UserMeTopArtistsContext } from 'state';
import { IArtist } from 'types/artist';
import { fetchWithToken } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

interface UserMeTopArtistsPageProps {
  data: IArtist[];
}

const UserMeTopArtistsPage: NextPage<UserMeTopArtistsPageProps> = (props) => {
  const { data } = props;

  return (
    <UserMeTopArtistsContext.Provider value={data}>
      <UserMeTopArtists />
    </UserMeTopArtistsContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const url = utilWithQueryParams(
    `${process.env.NEXT_PUBLIC_SPOTIFY_API}/me/top/artists`,
    {
      limit: 50,
      time_range: 'short_term'
    }
  );

  const { items: data }: { items: IArtist[] } = await fetchWithToken(
    req as NextApiRequest,
    url
  );

  return {
    props: { data }
  };
};

export default UserMeTopArtistsPage;
