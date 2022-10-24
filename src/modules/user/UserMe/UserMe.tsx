import { Flex } from '@chakra-ui/react';

import { useMe } from 'hooks/services';
import { UserContext } from 'state';

import { UserHeader } from '../User/components';

import { UserMeContent } from './components';

export function UserMe() {
  const { user = {}, isLoading } = useMe();

  return (
    (!isLoading && (
      <Flex flexDirection={'column'} gap={12}>
        <UserContext.Provider value={user}>
          <UserHeader />
          <UserMeContent />
        </UserContext.Provider>
      </Flex>
    )) || <></>
  );
}
