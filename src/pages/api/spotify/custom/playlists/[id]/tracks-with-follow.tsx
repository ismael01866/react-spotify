import { NextApiRequest, NextApiResponse } from 'next';
import { ITrack } from 'src/types/track';
import { fetchWithToken } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, ...query } = req.query;

  let playlistURL = utilWithQueryParams(
    `https://api.spotify.com/v1/playlists/${id}`,
    { ...query }
  );

  const tracks: ITrack[] = [];
  const { limit = 50 } = req.query;

  const {
    tracks: { items }
  }: {
    tracks: {
      items: ITrack[];
    };
  } = await fetchWithToken(req, playlistURL);

  do {
    const splicedItems = items.splice(0, limit as number);

    const tracksFollowURL = utilWithQueryParams(
      `https://api.spotify.com/v1/me/tracks/contains`,
      { ids: splicedItems?.map((track) => track?.track?.id).join(',') }
    );

    const tracksFollowed: ITrack[] = await fetchWithToken(
      req,
      tracksFollowURL
    );

    const data = splicedItems?.map((track, index) => {
      if (track.track) {
        track.track.is_following = !!tracksFollowed?.[index];
      }

      return track;
    });

    tracks.push(...data);
  } while (items.length);

  const result = tracks || [];

  return res.status(200).json(result);
}
