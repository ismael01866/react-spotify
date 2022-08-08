export interface IArtist {
  id: number;
  name: string;
  uri: string;
  popularity: number;
  images: {
    url: string;
  }[];
  followers: {
    total?: number;
  };
}
