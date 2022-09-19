import { NextApiRequest, NextApiResponse } from 'next';
import { IAlbum } from 'src/types/album';
import { fetchWithToken } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let albumsURL = utilWithQueryParams(
    'https://api.spotify.com/v1/me/albums',
    req.query
  );

  const albums: IAlbum[] = [];

  do {
    const {
      items,
      next
    }: { items: [{ album: IAlbum }]; next: string } =
      await fetchWithToken(req, albumsURL);

    const parsedItem = items.map((item) => item.album);

    albums.push(...parsedItem);

    albumsURL = next;
  } while (albumsURL);

  const result = albums || [];

  return res.status(200).json(result);
}
