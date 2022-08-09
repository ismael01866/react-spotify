export interface IArtist {
  id?: string;
  name?: string;
  uri?: string;
  popularity?: number;
  images?: {
    url?: string;
  }[];
  followers?: {
    total?: number;
  };
}
