import { NextApiRequest, NextApiResponse } from 'next';

import { IUser } from 'types/user';
import { fetchWithToken } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const usersURL = `https://api.spotify.com/v1/users/${id}`;
  const user: IUser = await fetchWithToken(req, usersURL);

  const usersFollowURL = utilWithQueryParams(
    `https://api.spotify.com/v1/me/following/contains`,
    { ids: id, type: 'user' }
  );

  const users: IUser[] = await fetchWithToken(req, usersFollowURL);

  user.is_following = !!users?.[0];

  const result = user || {};

  return res.status(200).json(result);
}
