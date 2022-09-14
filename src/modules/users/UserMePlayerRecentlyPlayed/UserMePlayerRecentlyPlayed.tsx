import { Flex } from '@chakra-ui/react';
import {
  UserMePlayerRecentlyPlayedContent,
  UserMePlayerRecentlyPlayedHeader
} from './components';

export function UserMePlayerRecentlyPlayed() {
  return (
    <Flex
      flexDirection={'column'}
      gap={12}
      height={'full'}
      overflow={'hidden'}
      mx={-12}
    >
      <UserMePlayerRecentlyPlayedHeader />
      <UserMePlayerRecentlyPlayedContent />
    </Flex>
  );
}
