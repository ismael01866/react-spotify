import { SimpleGrid, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTrack } from 'src/modules';
import { IAlbum } from 'src/types/album';
import { IArtist } from 'src/types/artist';
import {
  PlayControls,
  TrackMeta,
  TrackProgress,
  VolumeBar
} from './components';

export function Player() {
  const track = useSelector(selectTrack);

  const [album, setAlbum] = useState<IAlbum>({});
  const [artist, setArtist] = useState<IArtist>({});

  useEffect(() => {
    if (track.album) setAlbum(track.album);
    if (track.artists) setArtist(track.artists[0]);
  }, [track]);

  return (
    <SimpleGrid h={'6xs'} w={'full'} columns={3} spacing={8}>
      <TrackMeta album={album} artist={artist} track={track} />

      <VStack alignSelf={'center'} mt={2} spacing={0}>
        <PlayControls />
        <TrackProgress />
      </VStack>

      <VolumeBar />
    </SimpleGrid>
  );
}
