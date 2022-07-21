import { IUser } from 'types/user';

export class User implements IUser {
  name;
  image;

  constructor(props: IUser) {
    const { name, image } = props;

    this.name = name;
    this.image = image;
  }
}
