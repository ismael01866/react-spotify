import { User as UserProps } from 'types/user';

export class User {
  name;
  image;

  constructor({ name, image }: UserProps) {
    this.name = name;
    this.image = image;
  }
}
