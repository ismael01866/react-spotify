import { Center, Spinner } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import { LayoutGrid } from './components/LayoutGrid';

import { UserContext } from 'src/modules/users/User/UserContext';
import { useMe } from 'src/utils/hooks/services';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { status } = useSession();
  const { user, isLoading: userIsLoading } = useMe();

  if (status === 'loading' || userIsLoading) {
    return (
      <Center h={'100vh'} w={'100vw'}>
        <Spinner color={'spotify.500'} size={'xl'} />
      </Center>
    );
  }

  if (status !== 'authenticated') {
    return <>{children}</>;
  }

  return (
    <>
      <UserContext.Provider value={{ ...user }}>
        <LayoutGrid>{children}</LayoutGrid>;
      </UserContext.Provider>
    </>
  );
}
