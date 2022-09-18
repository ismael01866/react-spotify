import { NextApiRequest, NextApiResponse } from 'next';
import { ITrack } from 'src/types/track';
import { fetchWithToken } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const url = utilWithQueryParams(
    `https://api.spotify.com/v1/artists/${id}/top-tracks`,
    req.query
  );

  const { tracks }: { tracks: ITrack[] } = await fetchWithToken(
    req,
    url
  );
  const result = tracks || [];

  return res.status(200).json(result);
}
