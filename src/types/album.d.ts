import { IArtist } from './artist';

export interface IAlbum {
  id?: string;
  uri?: string;
  name?: string;
  images?: {
    url?: string;
  }[];
  release_date?: string;
  total_tracks?: number;
  artists?: IArtist[];
  popularity?: number;

  // custom

  is_following?: boolean;
}
