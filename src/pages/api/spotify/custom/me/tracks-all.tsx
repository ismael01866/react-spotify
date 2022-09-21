import { NextApiRequest, NextApiResponse } from 'next';
import { ITrack } from 'src/types/track';
import { fetchWithToken } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let tracksURL = utilWithQueryParams(
    'https://api.spotify.com/v1/me/tracks',
    req.query
  );

  const tracks: ITrack[] = [];

  do {
    const { items, next }: { items: ITrack[]; next: string } =
      await fetchWithToken(req, tracksURL);

    tracks.push(...items);

    tracksURL = next;
  } while (tracksURL);

  const result = tracks || [];

  return res.status(200).json(result);
}
