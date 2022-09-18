import { NextApiRequest, NextApiResponse } from 'next';
import { ITrack } from 'src/types/track';
import { fetchWithToken } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, ...query } = req.query;

  let tracksURL = utilWithQueryParams(
    `https://api.spotify.com/v1/albums/${id}/tracks`,
    { ...query }
  );

  const tracks: ITrack[] = [];
  const { limit } = req.query;

  do {
    const { items, next }: { items: ITrack[]; next: string } =
      await fetchWithToken(req, tracksURL);

    const tracksFollowURL = utilWithQueryParams(
      `https://api.spotify.com/v1/me/tracks/contains`,
      { ids: items?.map((track) => track.id).join(',') }
    );

    const tracksFollowed: ITrack[] = await fetchWithToken(
      req,
      tracksFollowURL
    );

    const data = items?.map((track, index) => {
      track.is_following = !!tracksFollowed?.[index];
      return track;
    });

    tracks.push(...data);

    tracksURL = next;
  } while (tracksURL && tracks.length < Number(limit));

  const result = tracks || [];

  return res.status(200).json(result);
}
