import { Box, Flex, Heading } from '@chakra-ui/react';
import { useArtistTopTracks } from 'src/lib/hooks/services';
import { ITrack } from 'src/types/track';
import { ArtistTablePopularTracks } from './components/ArtistTablePopularTracks';

export interface ArtistContentProps {
  country: string;
  artistID: string | string[];
}

export function ArtistContent(props: ArtistContentProps) {
  const { country, artistID } = props;

  const { tracks, isLoading } = useArtistTopTracks(artistID, {
    market: country
  });

  const skeletonData = new Array(10).fill('');
  const data = isLoading ? skeletonData : (tracks as ITrack[]);

  return (
    <Flex flexDirection={'column'} gap={12}>
      <Box>
        <Heading fontSize={'2xl'}>Popular</Heading>

        <br />
        <ArtistTablePopularTracks tracks={data} />
      </Box>
    </Flex>
  );
}
