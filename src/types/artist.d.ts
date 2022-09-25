export interface IArtist {
  id?: string;
  name?: string;
  uri?: string;
  images?: {
    url?: string;
  }[];
  followers?: {
    total?: number;
  };
  genres?: string[];
  popularity?: number;

  // custom

  is_following?: boolean;
}
