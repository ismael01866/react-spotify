import { IAlbum } from './album';
import { IArtist } from './artist';
import { IPlaylist } from './playlist';

export interface ITrack extends Spotify.Track {
  is_following?: boolean;
  is_visible?: boolean;
}
