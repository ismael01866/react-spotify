import { IArtist } from 'types/artist';

export class Artist implements IArtist {
  id;
  uri;

  name;
  images;
  followers;
  popularity;

  // custom

  totalFollowers;

  constructor(props: IArtist) {
    const { id, uri, name, images, followers, popularity } = props;

    this.id = id;
    this.uri = uri;

    this.name = name;
    this.images = images;
    this.followers = followers;
    this.popularity = popularity;

    this.totalFollowers = props.followers.total.toLocaleString();
  }
}
