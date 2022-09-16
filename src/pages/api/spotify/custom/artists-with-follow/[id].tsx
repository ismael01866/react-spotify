import { NextApiRequest, NextApiResponse } from 'next';
import { IArtist } from 'src/types/artist';
import { fetchWithToken } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const artistsURL = `https://api.spotify.com/v1/artists/${id}`;
  const artist: IArtist = await fetchWithToken(req, artistsURL);

  const artistsFollowURL = withQueryParams(
    `https://api.spotify.com/v1/me/following/contains`,
    { ids: id, type: 'artist' }
  );

  const artists: IArtist[] = await fetchWithToken(
    req,
    artistsFollowURL
  );

  artist.is_following = !!artists?.[0];

  const result = artist || {};

  return res.status(200).json(result);
}
