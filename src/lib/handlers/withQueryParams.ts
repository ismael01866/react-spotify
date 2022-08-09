import { NextApiRequest } from 'next';

export const withQueryParams = (req: NextApiRequest, url: string) => {
  const query = JSON.parse(JSON.stringify(req.query));
  const params = new URLSearchParams(query);

  return `${url}?${params}`;
};
