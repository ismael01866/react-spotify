import { Flex } from '@chakra-ui/react';
import { UserContext } from 'src/state';
import { useMe } from 'src/hooks/services';
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
