import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { selectTrack } from 'src/features/player/PlayerSlice';

import { SimpleGrid } from '@chakra-ui/react';

import { IAlbum } from 'src/types/album';
import { IArtist } from 'src/types/artist';
import { Controls, TrackMeta } from './components';

export interface PlayerProps {}

export function Player(props: PlayerProps) {
  const track = useSelector(selectTrack);

  const [album, setAlbum] = useState<IAlbum>({});
  const [artist, setArtist] = useState<IArtist>({});

  useEffect(() => {
    if (track.album) setAlbum(track.album);
    if (track.artists) setArtist(track.artists[0]);
  }, [track]);

  // useEffect(() => {
  //   if (!player) return;

  //   player.getCurrentState().then((state: any) => {
  //     if (!state) return;

  //     let counter = 0;
  //     const durationInSeconds = state.duration / 1000;

  //     setInterval(() => {
  //       setTest((counter++ * 100) / durationInSeconds);
  //     }, 1000);
  //   });
  // }, [player, playbackID]);

  /* <Progress colorScheme={'spotify'} size={'xs'} value={test} /> */

  return (
    <SimpleGrid
      bg={'bg.base'}
      h={'6xs'}
      w={'full'}
      columns={3}
      spacing={8}
    >
      <TrackMeta album={album} artist={artist} track={track} />
      <Controls />
      <div></div>
    </SimpleGrid>
  );
}
