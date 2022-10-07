import { StackDivider, VStack } from '@chakra-ui/react';
import { SidebarListNavItems } from './components/SidebarListNavItems';
import { SidebarListPlaylistItems } from './components/SidebarListPlaylistItems';

export function SidebarListNavigation() {
  return (
    <VStack
      divider={<StackDivider alignSelf={'center'} w={8} />}
      overflow={'hidden'}
      flex={'1 1 0'}
      spacing={4}
    >
      <SidebarListNavItems />
      <SidebarListPlaylistItems />
    </VStack>
  );
}
