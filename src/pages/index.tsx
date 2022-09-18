import { Home, HomeContext } from 'modules';
import type {
  GetServerSideProps,
  NextApiRequest,
  NextPage
} from 'next';
import { IArtist } from 'src/types/artist';
import { fetchWithToken } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';

interface IndexPageProps {
  topArtists: IArtist[];
}

const IndexPage: NextPage<IndexPageProps> = (props) => {
  const { topArtists } = props;

  return (
    <HomeContext.Provider value={{ topArtists }}>
      <Home />
    </HomeContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req
}) => {
  const topArtistsURL = utilWithQueryParams(
    'https://api.spotify.com/v1/me/top/artists',
    {
      limit: 6,
      time_range: 'short_term'
    }
  );

  const { items: topArtists }: { items: IArtist[] } =
    await fetchWithToken(req as NextApiRequest, topArtistsURL);

  return {
    props: { topArtists }
  };
};

export default IndexPage;
