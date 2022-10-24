import { Flex } from '@chakra-ui/react';

import { UserMeTopTracksContent, UserMeTopTracksHeader } from './components';

export function UserMeTopTracks() {
  return (
    <Flex flexDirection={'column'} gap={12}>
      <UserMeTopTracksHeader />
      <UserMeTopTracksContent />
    </Flex>
  );
}
