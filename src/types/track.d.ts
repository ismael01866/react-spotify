import { IAlbum } from './album';
import { IArtist } from './artist';

export interface ITrack {
  id?: string;
  uri?: string;
  name?: string;
  duration_ms?: number;
  album?: IAlbum;
  artists?: IArtist[];
  is_playable?: boolean;

  // custom

  is_following?: boolean;
  is_visible?: boolean;
}
