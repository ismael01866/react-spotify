import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import { LayoutGrid } from './components/LayoutGrid';

import { LoadingScreen } from 'src/components';
import { UserContext } from 'src/modules/users/User/UserContext';
import { SessionContext } from 'src/state';
import { useMe } from 'src/utils/hooks/services';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { status, data: session } = useSession();

  if (status === 'loading') {
    return <LoadingScreen />;
  }

  if (status !== 'authenticated') {
    return <>{children}</>;
  }

  return (
    <SessionContext.Provider value={session}>
      <LayoutUserContainer>{children}</LayoutUserContainer>
    </SessionContext.Provider>
  );
}

function LayoutUserContainer({ children }: LayoutProps) {
  const { user, isLoading } = useMe();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <UserContext.Provider value={{ ...user }}>
        <LayoutGrid>{children}</LayoutGrid>;
      </UserContext.Provider>
    </>
  );
}
