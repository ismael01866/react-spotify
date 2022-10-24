import { NextApiRequest, NextApiResponse } from 'next';

import { IPlaylist } from 'types/playlist';
import { fetchWithToken } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, ...query } = req.query;

  const playlistsURL = `https://api.spotify.com/v1/playlists/${id}`;
  const playlist: IPlaylist = await fetchWithToken(req, playlistsURL);

  const playlistsFollowURL = utilWithQueryParams(
    `https://api.spotify.com/v1/playlists/${id}/followers/contains`,
    { ...query }
  );

  const playlists: IPlaylist[] = await fetchWithToken(req, playlistsFollowURL);

  const result = playlist || {};

  if (playlist?.id) {
    const tracks = playlist?.tracks?.items || [];

    result.is_following = !!playlists?.[0];
    result.total_duration = calculatePlaylistDuration(tracks);
  }

  return res.status(200).json(result);
}

function calculatePlaylistDuration(tracks: SpotifyApi.PlaylistTrackObject[]) {
  return tracks.reduce((totalDuration, { track }) => {
    return track?.duration_ms
      ? totalDuration + track.duration_ms
      : totalDuration;
  }, 0);
}
