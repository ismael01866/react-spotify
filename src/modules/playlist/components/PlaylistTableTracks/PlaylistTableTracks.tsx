import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { PlaylistRowTrack } from './components';

interface PlaylistTableTracksProps {
  tracks: SpotifyApi.PlaylistTrackObject[];
}

export function PlaylistTableTracks(props: PlaylistTableTracksProps) {
  const { tracks } = props;

  return (
    <TableContainer>
      <Table variant={'simple-with-hover'}>
        <colgroup>
          <col style={{ width: 'auto' }} />
          <col style={{ width: '60%' }} />
          <col style={{ width: '40%' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: 'auto' }} />
        </colgroup>

        <Thead>
          <Tr>
            <Th textAlign={'right'}>#</Th>
            <Th px={0}>Title</Th>
            <Th px={0}>Album</Th>
            <Th></Th>
            <Th>Duration</Th>
          </Tr>
        </Thead>

        <Tbody>
          {tracks.map((track, index) => (
            <PlaylistRowTrack
              key={track?.track?.id || index}
              index={index + 1}
              track={track.track!}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
