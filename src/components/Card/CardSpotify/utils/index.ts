import { IAlbum } from 'types/album';
import { ITrack } from 'types/track';

type TGenericProps = {
  album?: IAlbum;
  type?: ITrack['context'];
  context?: ITrack['context'];
};

export const getURLByType = <T extends { id?: string }>(
  data: T & TGenericProps
) => {
  const { id, type, album } = data;

  switch (type) {
    case 'album':
      return `/albums/${id}`;

    case 'artist':
      return `/artists/${id}`;

    case 'playlist':
      return `/playlists/${id}`;

    case 'track':
      const { context: { type = '', uri = '' } = {} } = data;

      switch (type) {
        case 'album':
        case 'artist':
        case 'playlist':
          const id = uri?.split(':')?.pop();
          return `/${type}s/${id}`;

        case 'track':
          return `/albums/${album?.id}`;

        default:
          break;
      }

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
