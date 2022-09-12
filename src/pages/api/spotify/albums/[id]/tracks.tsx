import { NextApiRequest, NextApiResponse } from 'next';
import { ITrack } from 'src/types/track';
import { fetchWithToken } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const url = withQueryParams(
    `https://api.spotify.com/v1/albums/${id}/tracks`,
    req.query
  );

  const { items }: { items: ITrack[] } = await fetchWithToken(req, url);

  const result = items || [];

  return res.status(200).json(result);
}
