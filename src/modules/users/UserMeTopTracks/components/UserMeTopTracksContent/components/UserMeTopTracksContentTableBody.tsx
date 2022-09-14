import { Table, TableContainer, Tbody } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { UserRowTrack } from 'src/modules/users/components/UserTableTracks/components';
import { ITrack } from 'src/types/track';

interface UserMeTopTracksContentTableBody {
  tracks: ITrack[];
  tableColGroups: ReactNode;
}

export function UserMeTopTracksContentTableBody(
  props: UserMeTopTracksContentTableBody
) {
  const { tracks, tableColGroups } = props;

  return (
    <TableContainer>
      <Table size={'sm'} variant={'simple-with-hover'}>
        {tableColGroups}

        <Tbody>
          {tracks?.map((track, index) => (
            <UserRowTrack
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
