import { AlbumImage } from 'src/modules/albums/components';
import { ArtistImage } from 'src/modules/artists/components';
import { PlaylistImage } from 'src/modules/playlists/components';
import { TrackImage } from 'src/modules/tracks/components';
import { IAlbum } from 'src/types/album';
import { IArtist } from 'src/types/artist';
import { IPlaylist } from 'src/types/playlist';
import { ITrack } from 'src/types/track';

type CardSpotifyImageProps = {
  data: IAlbum | IArtist | IPlaylist | ITrack;
  type: 'album' | 'artist' | 'playlist' | 'track';
};

export function CardSpotifyImage(props: CardSpotifyImageProps) {
  const { type, data } = props;

  if (type === 'album') {
    return <AlbumImage album={data as IAlbum} />;
  }

  if (type === 'artist') {
    return <ArtistImage artist={data as IArtist} />;
  }

  if (type === 'playlist') {
    return <PlaylistImage playlist={data as IPlaylist} />;
  }

  if (type === 'track') {
    return <TrackImage track={data as ITrack} />;
  }

  return <></>;
}
