import { Text } from '@chakra-ui/react';
import { capitalize } from 'lodash';
import moment from 'moment';
import { MetaPopularity } from 'src/components/Meta';
import { IAlbum } from 'src/types/album';
import { IArtist } from 'src/types/artist';
import { IPlaylist } from 'src/types/playlist';
import { ITrack } from 'src/types/track';
import { utilPluralize } from 'src/utils/helpers';

export interface CardSpotifyContentProps<TData, TType> {
  data: TData;
  type: TType;
}

export function CardSpotifyContent<TData extends {}, TType extends string>(
  props: CardSpotifyContentProps<TData, TType>
) {
  const { type, data } = props;

  if (type === 'album') {
    const { release_date, popularity } = data as IAlbum;

    return (
      <>
        <Text color={'text.base'} fontSize={'sm'} noOfLines={1}>
          {moment(release_date).format('YYYY')}
        </Text>

        <MetaPopularity popularity={popularity} />
      </>
    );
  }

  if (type === 'artist') {
    const { genres, popularity } = data as IArtist;

    return (
      <>
        <Text color={'text.base'} fontSize={'sm'} noOfLines={1}>
          {[...(genres || ['No genres available'])].splice(0, 2).join(', ')}
        </Text>

        <MetaPopularity popularity={popularity} />
      </>
    );
  }

  if (type === 'playlist') {
    const { tracks: { total } = {} } = data as IPlaylist;

    return (
      <>
        <Text color={'text.base'} fontSize={'sm'} noOfLines={1}>
          {utilPluralize('track', total)}
        </Text>
      </>
    );
  }

  if (type === 'track') {
    const { context } = data as ITrack;

    return (
      <>
        <Text color={'text.base'} fontSize={'sm'} noOfLines={1}>
          {capitalize(context?.type)}
        </Text>
      </>
    );
  }

  return <></>;
}
