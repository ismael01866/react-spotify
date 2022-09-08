import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { ITrack } from 'src/types/track';
import { UserMeRowTopTrack } from './components';

export interface UserMeTableTopTracksProps {
  tracks: ITrack[];
}

export function UserMeTableTopTracks(props: UserMeTableTopTracksProps) {
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
            <UserMeRowTopTrack
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
