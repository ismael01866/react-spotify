import { NextApiRequest, NextApiResponse } from 'next';

import { IAlbum } from 'types/album';
import { fetchWithToken } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const albumsURL = `https://api.spotify.com/v1/albums/${id}`;
  const album: IAlbum = await fetchWithToken(req, albumsURL);

  const albumsFollowURL = utilWithQueryParams(
    `https://api.spotify.com/v1/me/albums/contains`,
    { ids: id }
  );

  const albumsFollowed: IAlbum[] = await fetchWithToken(req, albumsFollowURL);

  album.is_following = !!albumsFollowed?.[0];

  const result = album || {};

  return res.status(200).json(result);
}
