import { Box, Flex } from '@chakra-ui/react';

import { SidebarListNavigation, SidebarMenuUser } from './components';

export function Sidebar() {
  return (
    <Flex
      bg={'bg.900'}
      direction={'column'}
      h={'full'}
      overflow={'hidden'}
      py={8}
      w={20}
    >
      <Box mb={8} textAlign={'center'}>
        <SidebarMenuUser />
      </Box>

      <SidebarListNavigation />
    </Flex>
  );
}
