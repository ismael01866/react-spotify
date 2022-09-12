import { Table, Th, Thead, Tr } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

export interface UserMeTopTracksContentTableHead {
  tableColGroups: ReactNode;
}

export function UserMeTopTracksContentTableHead(
  props: UserMeTopTracksContentTableHead
) {
  const { tableColGroups } = props;

  return (
    <Table size={'sm'}>
      {tableColGroups}

      <Thead>
        <Tr>
          <Th></Th>
          <Th px={0}>Title</Th>
          <Th px={0}>Album</Th>
          <Th></Th>
          <Th>Duration</Th>
        </Tr>
      </Thead>
    </Table>
  );
}
