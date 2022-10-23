export interface ITrack extends Partial<SpotifyApi.TrackObjectFull> {
  is_following?: boolean;
  is_visible?: boolean;
}

// context?: {
//   uri?: 'string';
//   type?: SpotifyApi.ContextObject['type'] | 'track';
// };

// playlist?: SpotifyApi.PlaylistBaseObject;
// track?: SpotifyApi.TrackObjectFull & {
//   is_following?: boolean;
//   is_visible?: boolean;
// };
