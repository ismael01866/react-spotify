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
          <col style={{ width: 'auto' }} />
        </colgroup>

        <Tbody>
          {tracks
            .filter((track) => track.is_visible)
            .map((track) => (
              <ArtistRowPopularTrack key={track.id} track={track} />
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
