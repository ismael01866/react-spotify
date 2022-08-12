import { HStack } from '@chakra-ui/react';
import { MenuUser, Navigation } from './components';

export function Navbar() {
  return (
    <HStack justifyContent={'space-between'} px={12} py={6}>
      <Navigation />
      <MenuUser />
    </HStack>
  );
}
