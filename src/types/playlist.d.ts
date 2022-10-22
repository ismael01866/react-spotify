export interface IPlaylist extends SpotifyApi.PlaylistObjectFull {
  is_following?: boolean;
  total_duration?: number;
}
