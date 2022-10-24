import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';

import { LoadingScreen } from 'components';
import { useMe } from 'hooks/services';
import { SessionContext, UserContext } from 'state';

import { LayoutGrid } from './components/LayoutGrid';

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
