import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from 'src/state';
import { useUserWithFollow } from 'src/hooks/services/useUserWithFollow';
import { UserHeader } from './components';

export function User() {
  const router = useRouter();
  const { id } = useContext(UserContext);

  const { id: userID } = router.query;
  const { user, isLoading } = useUserWithFollow(userID, {
    ids: id
  });

  return (
    (!isLoading && user && (
      <Flex flexDirection={'column'} gap={16}>
        <UserContext.Provider value={user}>
          <UserHeader />
        </UserContext.Provider>
      </Flex>
    )) || <></>
  );
}
