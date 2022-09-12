import { IArtist } from './artist';
import { ITrack } from './track';
import { IUser } from './user';

export interface IPlaylist {
  id?: string;
  uri?: string;
  name?: string;
  description?: string;
  public?: boolean;
  images?: {
    url?: string;
  }[];
  followers?: {
    total?: number;
  }[];
  owner?: IUser;
  tracks?: {
    total?: number;
    items?: ITrack[];
  };

  // custom

  is_following?: boolean;
  total_duration?: number;
}
