import { NextApiRequest, NextApiResponse } from 'next';
import { IPlaylist } from 'src/types/playlist';
import { ITrack } from 'src/types/track';
import { fetchWithToken } from 'src/utils/fetch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const url = `https://api.spotify.com/v1/playlists/${id}`;

  const data: IPlaylist = await fetchWithToken(req, url);
  const result = data || {};

  if (data?.id) {
    const tracks = data?.tracks?.items || [];

    result.total_duration = calculatePlaylistDuration(tracks);
  }

  return res.status(200).json(result);
}

function calculatePlaylistDuration(tracks: ITrack[]) {
  return tracks.reduce((totalDuration, { track }) => {
    return track?.duration_ms
      ? totalDuration + track.duration_ms
      : totalDuration;
  }, 0);
}
