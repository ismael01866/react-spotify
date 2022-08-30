import { NextApiRequest, NextApiResponse } from 'next';
import { fetchWithToken } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/utils';
import { ITrack } from 'src/types/track';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, ...query } = req.query;

  let tracksURL = withQueryParams(
    `https://api.spotify.com/v1/albums/${id}/tracks`,
    { ...query }
  );

  const tracks: ITrack[] = [];

  do {
    const { items, next }: { items: ITrack[]; next: string } =
      await fetchWithToken(req, tracksURL);

    const tracksFollowURL = withQueryParams(
      `https://api.spotify.com/v1/me/tracks/contains`,
      { ids: items?.map((track) => track.id).join(',') }
    );

    const tracksFollowed = await fetchWithToken(req, tracksFollowURL);

    const data = items?.map((track, index) => {
      track.is_following = tracksFollowed?.[index];
      return track;
    });

    tracksURL = next;
    tracks.push(...data);
  } while (tracksURL);

  const result = tracks || [];

  return res.status(200).json(result);
}
