import { Box, Flex } from '@chakra-ui/react';
import { SidebarListNavigation, SidebarMenuUser } from './components';

export function Sidebar() {
  return (
    <Flex
      bg={'bg.900'}
      direction={'column'}
      h={'full'}
      py={8}
      px={4}
      w={20}
    >
      <Box mb={8} textAlign={'center'}>
        <SidebarMenuUser />
      </Box>

      <SidebarListNavigation />
    </Flex>
  );
}
