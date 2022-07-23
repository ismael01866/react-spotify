export interface IArtist {
  id?: number;
  name?: string;
  uri?: string;

  images?: {
    url?: string;
  }[];

  followers?: {
    total?: number;
  };

  popularity?: number;
}
