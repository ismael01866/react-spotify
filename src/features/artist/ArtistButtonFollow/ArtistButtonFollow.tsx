import { Button } from '@chakra-ui/react';
import { useArtistFollow } from 'src/lib/hooks/services/useArtistFollow';

import { IArtist } from 'src/types/artist';

export interface ArtistButtonFollowProps {
  artist: IArtist;
  // isLoading: boolean;
}

export function ArtistButtonFollow(props: ArtistButtonFollowProps) {
  const { artist } = props;

  const artistID = artist.id || '';
  const { isFollowingArtist, isLoading } = useArtistFollow([artistID]);

  return <Button></Button>;
}
