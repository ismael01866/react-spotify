import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import { LayoutGrid } from './components/LayoutGrid';
import { useSpotifyPlayerEmbed } from './hooks';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  useSpotifyPlayerEmbed();

  const { status } = useSession();

  // render

  if (status === 'loading') {
    return <>loading...</>;
  }

  if (status !== 'authenticated') {
    return <>{children}</>;
  }

  return <LayoutGrid>{children}</LayoutGrid>;
}
