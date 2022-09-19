import { uniqBy } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import { ITrack } from 'src/types/track';
import { fetchWithToken } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { limit } = req.query;

  let tracksURL = utilWithQueryParams(
    'https://api.spotify.com/v1/me/player/recently-played',
    req.query
  );

  let parsedResults: ITrack[] = [];

  do {
    const { items, next }: { items: ITrack[]; next: string } =
      await fetchWithToken(req, tracksURL);

    const tracks: ITrack[] = [];
    const albums: ITrack[] = [];
    const artists: ITrack[] = [];
    const playlists: ITrack[] = [];

    const parsedTracks =
      items.map((item) => {
        (item.track || {}).context = item?.context;

        return item.track;
      }) || [];

    parsedTracks.forEach((track) => {
      if (track?.context) {
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
      }

      if (track && !track?.context) {
        track.context = { type: 'track' };
        tracks.push(track);
      }
    });

    const uniqTracks = uniqBy(tracks, ({ context }) => {
      return context?.uri;
    });

    const uniqAlbums = uniqBy(albums, ({ context }) => {
      return context?.uri;
    });

    const uniqArtists = uniqBy(artists, ({ context }) => {
      return context?.uri;
    });

    const uniqPlaylists = uniqBy(playlists, ({ context }) => {
      return context?.uri;
    });

    // we filter the absolute unique entities per track,
    // this means that albums, artists, etc, will not be
    // repeated, the final payload will only have unique artists, albums, tracks, ...

    parsedResults = uniqBy(
      [
        ...parsedResults,
        ...uniqTracks,
        ...uniqAlbums,
        ...uniqArtists,
        ...uniqPlaylists
      ],
      ({ context }) => context?.uri
    );

    tracksURL = next;
  } while (tracksURL && parsedResults.length < Number(limit));

  // since the items of type 'artist' don't have any image metadata, we
  // need to fetch the individual artist info

  for (let result of parsedResults) {
    if (
      result?.artists?.[0] &&
      result?.context?.href &&
      result?.context?.type === 'artist'
    ) {
      const artistData = await fetchWithToken(req, result.context.href);

      result.artists = [{ ...artistData }];
    }
  }

  // since the items of type 'playlist' don't have any metadata, we
  // need to fetch the individual playlist info

  for (let result of parsedResults) {
    if (result.context?.type === 'playlist' && result.context.href) {
      const playlistData = await fetchWithToken(
        req,
        result.context.href
      );

      result.playlist = playlistData;
    }
  }

  const result = parsedResults.splice(0, Number(limit)) || [];

  return res.status(200).json(result);
}
