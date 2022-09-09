import { Box, Heading } from '@chakra-ui/react';

export function UserMeTopTracksHeader() {
  return (
    <Box flexShrink={0} px={12}>
      <Heading fontSize={'3xl'}>Top tracks</Heading>
    </Box>
  );
}
