export interface IAlbum {
  id?: string;
  uri?: string;
  name?: string;
  images?: {
    url?: string;
  }[];
  release_date?: string;
  type?: string;
}
