import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';

import { fetcher } from 'src/utils/fetch';

export const fetchWithToken = async (
  req: NextApiRequest,
  url: string,
  opts = {}
) => {
  const token = await getToken({ req });
  const access_token = token?.access_token as string;

  return fetcher(url, {
    headers: { Authorization: `Bearer ${access_token}` },
    ...opts
  });
};
