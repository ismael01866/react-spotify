import { memo } from 'react';
import { ButtonPlay } from 'src/components/Button/ButtonPlay';
import { IAlbum } from 'src/types/album';
import { IArtist } from 'src/types/artist';
import { IPlaylist } from 'src/types/playlist';
import { ITrack } from 'src/types/track';

interface CardButtonPlayProps<T> {
  data: T &
    (IAlbum | IArtist | IPlaylist | ITrack) & {
      context: ITrack['context'];
    };
  type: 'album' | 'artist' | 'playlist' | 'track';
  [others: string]: any;
}

const MemoButtonPlay = memo(ButtonPlayContainer);

export function CardButtonPlay<T>(props: CardButtonPlayProps<T>) {
  const {
    type,
    data: { context, uri }
  } = props;

  if (type === 'track') {
    if (context?.type === 'track') {
      return <MemoButtonPlay uri={uri} />;
    }

    return <MemoButtonPlay context_uri={context?.uri} />;
  }

  return <MemoButtonPlay context_uri={uri} />;
}

function ButtonPlayContainer({ ...others }) {
  return (
    <ButtonPlay
      bottom={4}
      right={4}
      pos={'absolute'}
      opacity={0}
      _groupHover={{ opacity: 1 }}
      {...others}
    />
  );
}
