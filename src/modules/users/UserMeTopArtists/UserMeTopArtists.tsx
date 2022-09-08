import { Flex } from '@chakra-ui/react';
import {
  UserMeTopArtistsContent,
  UserMeTopArtistsHeader
} from './components';

export function UserMeTopArtists() {
  return (
    <Flex
      flexDirection={'column'}
      gap={12}
      height={'full'}
      overflow={'hidden'}
      mx={-12}
    >
      <UserMeTopArtistsHeader />
      <UserMeTopArtistsContent />
    </Flex>
  );
}
