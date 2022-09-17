import { NextApiRequest, NextApiResponse } from 'next';
import { IAlbum } from 'src/types/album';
import { fetchWithToken } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const url = withQueryParams(
    `https://api.spotify.com/v1/artists/${id}/albums`,
    req.query
  );

  const {
    items,
    limit,
    offset
  }: { items: IAlbum[]; limit: number; offset: number } =
    await fetchWithToken(req, url);

  const result = {
    items: items || [],
    limit: limit || 0,
    offset: offset || 0
  };

  return res.status(200).json(result);
}
