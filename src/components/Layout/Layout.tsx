import { VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Navbar } from './components';

export interface LayoutProps {
  children: ReactNode;
}

export function Layout(props: LayoutProps) {
  return (
    <VStack>
      <Navbar />
    </VStack>
  );
}
