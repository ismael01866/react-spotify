import { UserMeTopArtists, UserMeTopArtistsContext } from 'modules';
import type { NextApiRequest, NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { IArtist } from 'src/types/artist';
import { fetchWithToken } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';

interface UserMeTopArtistsPageProps {
  data: IArtist[];
}

const UserMeTopArtistsPage: NextPage<UserMeTopArtistsPageProps> = (
  props
) => {
  const { data } = props;

  return (
    <UserMeTopArtistsContext.Provider value={data}>
      <UserMeTopArtists />
    </UserMeTopArtistsContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req
}) => {
  const url = utilWithQueryParams(
    'https://api.spotify.com/v1/me/top/artists',
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
