export interface IUser extends Partial<SpotifyApi.UserObjectPrivate> {
  is_following?: boolean;
}
