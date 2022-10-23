export interface IPlaylist extends Partial<SpotifyApi.PlaylistObjectFull> {
  is_following?: boolean;
  total_duration?: number;
}
