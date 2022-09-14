import { uniqBy } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import { ITrack } from 'src/types/track';
import { fetchWithToken } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { limit } = req.query;

  let tracksURL = withQueryParams(
    'https://api.spotify.com/v1/me/player/recently-played',
    req.query
  );

  let tracks: ITrack[] = [];

  do {
    const { items, next }: { items: ITrack[]; next: string } =
      await fetchWithToken(req, tracksURL);

    const albums: ITrack[] = [];
    const artists: ITrack[] = [];

    // remove the playlist type since spotify doesn't provide
    // enough metadada to properly use this type of entity

    const filteredItems = items.filter(
      (item) => item?.context?.type !== 'playlist'
    );

    const parsedTracks =
      filteredItems.map((item) => {
        (item.track || {}).context = item?.context;
        return item.track;
      }) || [];

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
    });

    const uniqAlbums = uniqBy(albums, ({ context }) => {
      return context?.uri;
    });

    const uniqArtists = uniqBy(artists, ({ context }) => {
      return context?.uri;
    });

    // we filter the absolute unique entities per track,
    // this means that albums, artists, etc, will not be
    // repeated, the final payload will only have unique artists, albums

    tracks = uniqBy(
      [...tracks, ...uniqAlbums, ...uniqArtists],
      ({ context }) => context?.uri
    );

    tracksURL = next;
  } while (tracksURL && tracks.length < Number(limit));

  const result = tracks || [];

  return res.status(200).json(result);
}
