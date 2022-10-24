import { NextApiRequest, NextApiResponse } from 'next';

import { ITrack } from 'types/track';
import { fetchWithToken } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, ...others } = req.query;

  const topTracksURL = utilWithQueryParams(
    `https://api.spotify.com/v1/artists/${id}/top-tracks`,
    { ...others }
  );

  const { tracks }: { tracks: ITrack[] } = await fetchWithToken(
    req,
    topTracksURL
  );

  const tracksFollowURL = utilWithQueryParams(
    `https://api.spotify.com/v1/me/tracks/contains`,
    { ids: tracks?.map((track) => track.id).join(',') }
  );

  const tracksFollowed: ITrack[] = await fetchWithToken(req, tracksFollowURL);

  const data = tracks?.map((track, index) => {
    track.is_following = !!tracksFollowed?.[index];
    return track;
  });

  const result = data || [];

  return res.status(200).json(result);
}
