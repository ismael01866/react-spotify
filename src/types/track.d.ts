import { IAlbum } from './album';
import { IArtist } from './artist';

export interface ITrack {
  id?: number;
  name?: string;
  uri?: string;
  duration_ms?: number;

  album?: IAlbum;
  artists?: IArtist[];
}
