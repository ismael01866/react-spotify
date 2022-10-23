import { NextApiRequest, NextApiResponse } from 'next';
import { ITrack } from 'src/types/track';
import { fetchWithToken } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = utilWithQueryParams(
    'https://api.spotify.com/v1/me/tracks',
    req.query
  );

  // PUT - DELETE

  if (req.method === 'PUT' || req.method === 'DELETE') {
    let isFollowing = false;

    await fetchWithToken(req, url, {
      method: req.method
    }).then(() => {
      isFollowing = req.method === 'PUT' ? true : false;
    });

    return res.status(200).json({ isFollowing });
  }

  // GET

  const tracks: ITrack[] = [];

  const {
    items,
    limit,
    offset,
    total
  }: {
    items: SpotifyApi.PlaylistTrackObject[];
    limit: number;
    offset: number;
    total: number;
  } = await fetchWithToken(req, url);

  const tracksFollowURL = utilWithQueryParams(
    `https://api.spotify.com/v1/me/tracks/contains`,
    { ids: items?.map((track) => track?.track?.id).join(',') }
  );

  const tracksFollowed: ITrack[] = await fetchWithToken(req, tracksFollowURL);

  const data = items?.map((track, index) => {
    if (track.track) {
      (track.track as ITrack).is_following = !!tracksFollowed?.[index];
    }

    return track;
  });

  tracks.push(...data);

  const result = {
    items: tracks || [],
    total: total,
    limit: limit,
    offset: offset
  };

  return res.status(200).json(result);
}
