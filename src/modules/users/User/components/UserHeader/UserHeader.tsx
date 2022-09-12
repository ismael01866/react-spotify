import { Box, HStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserImage } from 'src/modules/users/components';
import { UserContext } from '../../UserContext';
import { UserMeta } from './components';

export function UserHeader() {
  const user = useContext(UserContext);

  return (
    <Box minH={'2xs'} pos={'relative'}>
      <HStack spacing={8}>
        <Box boxSize={'3xs'} mt={8}>
          <UserImage user={user} />
        </Box>

        <Box pt={6}>
          <UserMeta user={user} />
        </Box>
      </HStack>
    </Box>
  );
}
