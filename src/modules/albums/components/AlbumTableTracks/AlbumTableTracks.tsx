import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { ITrack } from 'src/types/track';
import { AlbumRowTrack } from './components';

interface AlbumTableTracksProps {
  tracks: ITrack[];
}

export function AlbumTableTracks(props: AlbumTableTracksProps) {
  const { tracks } = props;

  return (
    <TableContainer>
      <Table variant={'simple-with-hover'}>
        <colgroup>
          <col style={{ minWidth: '4rem' }} />
          <col style={{ width: '100%' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: 'auto' }} />
        </colgroup>

        <Thead>
          <Tr>
            <Th></Th>
            <Th px={0}>Title</Th>
            <Th></Th>
            <Th>Duration</Th>
          </Tr>
        </Thead>

        <Tbody>
          {tracks.map((track, index) => (
            <AlbumRowTrack
              key={track.id || index}
              index={index + 1}
              track={track}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
