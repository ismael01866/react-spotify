export interface IArtist {
  id: number;
  uri: string;

  name: string;

  images: {
    url: string;
  }[];

  followers: {
    total: number;
  };

  popularity: number;
}
