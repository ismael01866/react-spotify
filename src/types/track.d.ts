export interface ITrack extends Partial<SpotifyApi.TrackObjectFull> {
  artists?: SpotifyApi.ArtistObjectFull[];

  context?: {
    uri?: 'string';
    type?: SpotifyApi.ContextObject['type'] | 'track';
  };

  is_visible?: boolean;
  is_following?: boolean;

  playlist?: SpotifyApi.PlaylistBaseObject;
}
