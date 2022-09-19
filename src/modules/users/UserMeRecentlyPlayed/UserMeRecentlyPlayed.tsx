import { Flex } from '@chakra-ui/react';
import {
  UserMeRecentlyPlayedContent,
  UserMeRecentlyPlayedHeader
} from './components';

export function UserMeRecentlyPlayed() {
  return (
    <Flex flexDirection={'column'} gap={12}>
      <UserMeRecentlyPlayedHeader />
      <UserMeRecentlyPlayedContent />
    </Flex>
  );
}
