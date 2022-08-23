import { Table, TableContainer, Tbody } from '@chakra-ui/react';
import { ITrack } from 'src/types/track';
import { AlbumRowTrack } from './components';

export interface AlbumTableTracksProps {
  tracks: ITrack[];
}

export function AlbumTableTracks(props: AlbumTableTracksProps) {
  const { tracks } = props;

  return (
    <TableContainer>
      <Table variant={'simple-with-hover'}>
        <colgroup>
          <col style={{ width: 'auto' }} />
          <col style={{ width: '100%' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: 'auto' }} />
        </colgroup>

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
