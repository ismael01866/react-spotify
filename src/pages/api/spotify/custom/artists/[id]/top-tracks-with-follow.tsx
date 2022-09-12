import { NextApiRequest, NextApiResponse } from 'next';
import { ITrack } from 'src/types/track';
import { fetchWithToken } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, ...others } = req.query;

  const topTracksURL = withQueryParams(
    `https://api.spotify.com/v1/artists/${id}/top-tracks`,
    { ...others }
  );

  const { tracks }: { tracks: ITrack[] } = await fetchWithToken(
    req,
    topTracksURL
  );

  const tracksFollowURL = withQueryParams(
    `https://api.spotify.com/v1/me/tracks/contains`,
    { ids: tracks?.map((track) => track.id).join(',') }
  );

  const tracksFollowed: ITrack[] = await fetchWithToken(
    req,
    tracksFollowURL
  );

  const data = tracks?.map((track, index) => {
    track.is_following = !!tracksFollowed?.[index];
    return track;
  });

  const result = data || [];

  return res.status(200).json(result);
}
