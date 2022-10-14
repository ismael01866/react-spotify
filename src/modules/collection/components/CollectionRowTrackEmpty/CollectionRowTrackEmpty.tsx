import { Td, Tr } from '@chakra-ui/react';
import { Skeleton } from 'src/components/Skeleton';

export function CollectionRowTrackEmpty() {
  return (
    <Tr>
      <Td>
        <Skeleton startColor={''} h={6} w={6} />
      </Td>
      <Td px={0}>
        <Skeleton startColor={''} h={4} />
      </Td>
      <Td>
        <Skeleton startColor={''} h={4} />
      </Td>
      <Td></Td>
      <Td>
        <Skeleton startColor={''} h={4} />
      </Td>
    </Tr>
  );
}
