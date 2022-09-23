import { NextApiRequest, NextApiResponse } from 'next';
import { IArtist } from 'src/types/artist';
import { fetchWithToken } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = utilWithQueryParams(
    'https://api.spotify.com/v1/me/following',
    req.query
  );

  if (req.method === 'PUT' || req.method === 'DELETE') {
    let isFollowing = false;

    await fetchWithToken(req, url, {
      method: req.method
    }).then(() => {
      isFollowing = req.method === 'PUT' ? true : false;
    });

    return res.status(200).json({ isFollowing });
  }

  const {
    artists: {
      items,
      total,
      cursors: { after }
    }
  }: {
    artists: {
      items: IArtist[];
      total: number;
      cursors: { after: string };
    };
  } = await fetchWithToken(req, url);

  const result = {
    after,
    total,
    items: items || []
  };

  return res.status(200).json(result);
}
