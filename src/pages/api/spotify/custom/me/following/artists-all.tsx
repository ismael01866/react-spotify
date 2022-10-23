import { NextApiRequest, NextApiResponse } from 'next';
import { IArtist } from 'src/types/artist';
import { fetchWithToken } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let artistsURL = utilWithQueryParams(
    'https://api.spotify.com/v1/me/following',
    req.query
  );

  const artists: IArtist[] = [];

  do {
    const {
      artists: { items, next }
    }: { artists: { items: IArtist[]; next: string } } = await fetchWithToken(
      req,
      artistsURL
    );

    artists.push(...items);

    artistsURL = next;
  } while (artistsURL);

  if (req.query.sort) {
    artists.sort((a, b) => {
      const prop = req.query.sort as keyof IArtist;

      if (!a[prop] || !b[prop]) return 0;

      const aProp = a[prop] as keyof IArtist;
      const bProp = b[prop] as keyof IArtist;

      return aProp < bProp ? -1 : 1;
    });
  }

  const result = artists || [];

  return res.status(200).json(result);
}
