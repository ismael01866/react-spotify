import { Box, Flex, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { useArtistTopTracksWithFollow } from 'src/lib/hooks/services';
import { ITrack } from 'src/types/track';
import { ArtistTablePopularTracks } from './components/ArtistTablePopularTracks';

export interface ArtistContentProps {
  country: string;
  artistID: string | string[];
}

export function ArtistContent(props: ArtistContentProps) {
  const { country, artistID } = props;

  // const [tracks, setTracks] = useState<ITrack[]>();
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  // useArtistTopTracksWithFollow(artistID, country).then(
  //   ({ tracks, isLoading }) => {
  //     setTracks(tracks);
  //     setIsLoading(isLoading);

  //     console.log(tracks);
  //   }
  // );
  // }, [artistID, country]);

  const { tracks, isLoading } = useArtistTopTracksWithFollow(
    artistID,
    country
  );

  const skeletonData = new Array(10).fill('');
  const data = isLoading ? skeletonData : (tracks as ITrack[]);

  // console.log(tracks);

  // console.log(tracksFollowed);

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
