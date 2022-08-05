import { HStack } from '@chakra-ui/react';
import { MenuUser, Navigation } from './components';

export interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  return (
    <HStack justifyContent={'space-between'} px={12} py={4}>
      <Navigation />
      <MenuUser />
    </HStack>
  );
}
