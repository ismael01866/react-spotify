import { IAlbum } from './album';
import { IArtist } from './artist';
import { IPlaylist } from './playlist';

export interface ITrack {
  id?: string;
  uri?: string;
  name?: string;
  added_at?: string;
  duration_ms?: number;

  track?: ITrack;
  album?: IAlbum;
  artists?: IArtist[];
  playlist?: IPlaylist;

  is_playable?: boolean;

  context?: {
    uri?: string;
    href?: string;
    type?: string;
  };

  // custom

  is_following?: boolean;
  is_visible?: boolean;
}
