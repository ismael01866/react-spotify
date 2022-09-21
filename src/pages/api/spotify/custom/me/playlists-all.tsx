import { NextApiRequest, NextApiResponse } from 'next';
import { IPlaylist } from 'src/types/playlist';
import { fetchWithToken } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let playlistsURL = utilWithQueryParams(
    'https://api.spotify.com/v1/me/playlists',
    req.query
  );

  const playlists: IPlaylist[] = [];

  do {
    const { items, next }: { items: IPlaylist[]; next: string } =
      await fetchWithToken(req, playlistsURL);

    playlists.push(...items);

    playlistsURL = next;
  } while (playlistsURL);

  const result = playlists || [];

  return res.status(200).json(result);
}
