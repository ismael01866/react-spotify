import { Table, TableContainer, Tbody } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { UserRowTrack } from 'src/modules/users/components/UserTableTracks/components';
import { ITrack } from 'src/types/track';

export interface UserMeTopTracksContentTableBody {
  data: ITrack[];
  tableColGroups: ReactNode;
}

export function UserMeTopTracksContentTableBody(
  props: UserMeTopTracksContentTableBody
) {
  const { data, tableColGroups } = props;

  return (
    <TableContainer>
      <Table size={'sm'} variant={'simple-with-hover'}>
        {tableColGroups}

        <Tbody>
          {data?.map((track, index) => (
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
