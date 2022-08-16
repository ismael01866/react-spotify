import { Table, TableContainer, Tbody } from '@chakra-ui/react';
import { ITrack } from 'src/types/track';
import { ArtistRowPopularTrack } from './components';

export interface ArtistTablePopularTracksProps {
  tracks: ITrack[];
}

export function ArtistTablePopularTracks(
  props: ArtistTablePopularTracksProps
) {
  const { tracks } = props;

  return (
    <TableContainer>
      <Table variant={'simple-with-hover'}>
        <colgroup>
          <col style={{ width: 'auto' }} />
          <col style={{ width: '100%' }} />
          <col style={{ width: 'auto' }} />
        </colgroup>

        <Tbody>
          {tracks?.map((track, index) => {
            return (
              <ArtistRowPopularTrack
                key={track.id || index}
                track={track}
              />
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
