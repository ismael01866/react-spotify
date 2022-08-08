import { IAlbum } from './album';
import { IArtist } from './artist';

export interface ITrack {
  id: number;
  uri: string;
  name: string;
  duration_ms: number;
  album: IAlbum;
  artists: IArtist[];
}
