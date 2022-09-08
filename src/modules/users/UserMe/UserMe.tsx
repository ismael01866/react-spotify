import { Flex } from '@chakra-ui/react';
import { useMe } from 'src/utils/hooks/services';
import { UserHeader } from '../User/components';
import { UserContext } from '../User/UserContext';
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
