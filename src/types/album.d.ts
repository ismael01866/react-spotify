import { IArtist } from './artist';

export interface IAlbum {
  id?: string;
  uri?: string;
  name?: string;
  images?: {
    url?: string;
  }[];
  release_date?: string;
  type?: string;
  total_tracks?: number;
  artists?: IArtist[];

  // custom

  is_following?: boolean;
}
