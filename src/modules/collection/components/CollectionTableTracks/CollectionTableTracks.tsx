import { Table, TableContainer, Th, Thead, Tr } from '@chakra-ui/react';
import { useContext } from 'react';
import { CollectionTracksContext } from 'src/state';
import { CollectionTableBody } from './components/CollectionTableBody';

interface CollectionTableTracksProps {
  skeletonTracks: any[];
}

export function CollectionTableTracks(
  props: CollectionTableTracksProps
) {
  const { chunkSize } = useContext(CollectionTracksContext);
  const { skeletonTracks } = props;

  return (
    <TableContainer>
      <Table variant={'simple-with-hover'}>
        <colgroup>
          <col style={{ minWidth: '4rem' }} />
          <col style={{ width: '100%' }} />
          <col style={{ minWidth: '12rem' }} />
          <col style={{ minWidth: 'auto' }} />
          <col style={{ width: 'auto' }} />
        </colgroup>

        <Thead>
          <Tr>
            <Th></Th>
            <Th px={0}>Title</Th>
            <Th>Date Added</Th>
            <Th></Th>
            <Th>Duration</Th>
          </Tr>
        </Thead>

        {[...skeletonTracks]?.map((_, index) => {
          if (index && index % chunkSize === 0) {
            const chunkIndex = index / chunkSize;

            const sliceStart = (chunkIndex - 1) * chunkSize;
            const sliceFinish = chunkIndex * chunkSize;

            const skeletonData = [...skeletonTracks].slice(
              sliceStart,
              sliceFinish
            );

            return (
              <CollectionTableBody
                key={chunkIndex}
                index={chunkIndex}
                skeletonTracks={skeletonData}
              />
            );
          }
        })}
      </Table>
    </TableContainer>
  );
}
