import { uniqBy, uniqWith } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import { ITrack } from 'src/types/track';
import { fetchWithToken } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = withQueryParams(
    'https://api.spotify.com/v1/me/player/recently-played',
    req.query
  );

  const { items }: { items: ITrack[] } = await fetchWithToken(req, url);

  const parsedTracks =
    items.map((item) => {
      (item.track || {}).context = item?.context;
      return item.track;
    }) || [];

  const albums: ITrack[] = [];
  const artists: ITrack[] = [];
  const playlists: ITrack[] = [];

  parsedTracks.forEach((track) => {
    if (!track?.context) return;

    const {
      context: { type }
    } = track;

    if (type === 'album') {
      albums.push(track);
    }

    if (type === 'artist') {
      artists.push(track);
    }

    if (type === 'playlist') {
      playlists.push(track);
    }
  });

  const uniqueAlbums = uniqBy(albums, ({ context }) => {
    return context?.uri;
  });

  const uniqueArtists = uniqBy(artists, ({ context }) => {
    return context?.uri;
  });

  const uniquePlaylists = uniqBy(playlists, ({ context }) => {
    return context?.uri;
  });

  const result = [
    ...uniqueAlbums,
    ...uniqueArtists,
    ...uniquePlaylists
  ];

  return res.status(200).json(result);
}
