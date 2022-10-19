export interface IUser {
  id?: string;
  email?: string;
  display_name?: string;
  country?: string;
  images?: {
    url?: string;
  }[];

  followers?: {
    total?: number;
  };

  // custom

  is_following?: boolean;
}
