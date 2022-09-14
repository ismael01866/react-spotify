import { Box, Heading } from '@chakra-ui/react';

export function UserMePlayerRecentlyPlayedHeader() {
  return (
    <Box flexShrink={0} px={12}>
      <Heading fontSize={'3xl'}>Recently played</Heading>
    </Box>
  );
}
