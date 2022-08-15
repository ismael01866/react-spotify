import { Table, TableContainer, Tbody } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectUser } from 'src/features/user';
import { useArtistTopTracks } from 'src/lib/hooks/services';
import { ArtistRowPopularTrack } from './components';

export function ArtistTablePopularTracks() {
  const router = useRouter();
  const { id } = router.query;

  const user = useSelector(selectUser);
  const { tracks, isLoading } = useArtistTopTracks(id, {
    market: user.country
  });

  const skeletonData = new Array(10).fill('');
  const data = isLoading ? skeletonData : tracks;

  return (
    <TableContainer>
      <Table sx={{ tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '4rem' }} />
          <col style={{ width: '100%' }} />
          <col style={{ width: '4rem' }} />
        </colgroup>

        <Tbody>
          {data?.map((track, index) => {
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
