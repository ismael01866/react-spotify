import { IAlbum } from 'src/types/album';
import { ITrack } from 'src/types/track';

type TGenericProps = {
  album?: IAlbum;
  type?: ITrack['type'];
  context?: ITrack['context'];
};

export const getURLByType = <T extends { id?: string }>(
  item: T & TGenericProps
) => {
  const { id, type, album } = item;

  switch (type) {
    case 'album':
      return `/albums/${id}`;

    case 'artist':
      return `/artists/${id}`;

    case 'playlist':
      return `/playlists/${id}`;

    case 'track':
      () => {
        const { context: { type = '', uri = '' } = {} } = item;

        const id = uri?.split(':')?.pop();

        switch (type) {
          case 'album':
            return `/albums/${id}`;

          case 'artist':
            return `/artists/${id}`;

          case 'playlist':
            return `/playlists/${id}`;

          case 'track':
            return `/albums/${album?.id}`;

          default:
            break;
        }
      };

    default:
      break;
  }
};

export const getNameByContext = (track: ITrack) => {
  if (!track.context) return;

  const {
    context: { type }
  } = track;

  switch (type) {
    case 'album':
      return track?.album?.name;

    case 'artist':
      return track?.artists?.[0]?.name;

    case 'track':
      return track?.name;

    case 'playlist':
      return track?.playlist?.name;

    default:
      break;
  }
};
