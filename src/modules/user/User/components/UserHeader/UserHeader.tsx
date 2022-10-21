import { Box, HStack, Image, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { HeaderBanner, HeaderMetaImage } from 'src/components/Header';
import {
  UserButtonFollow,
  UserEmptySkeleton
} from 'src/modules/user/components';
import { UserContext } from 'src/state';
import { UserMeta } from './components';

export function UserHeader() {
  const user = useContext(UserContext);
  const { images, display_name } = user;

  return (
    <Box pos={'relative'} mx={-12} mt={-12}>
      <Box boxSize={'full'} overflow={'hidden'} pos={'absolute'}>
        <HeaderBanner>
          <Image src={images?.[0]?.url} alt={display_name} />
        </HeaderBanner>
      </Box>

      <Box px={12} pt={24} pos={'relative'}>
        <HStack spacing={8}>
          <HeaderMetaImage mb={-4}>
            <Image
              alt={display_name}
              src={images?.[0]?.url}
              fallback={<UserEmptySkeleton />}
            />
          </HeaderMetaImage>

          <VStack alignItems={'flex-start'} spacing={8}>
            <UserMeta user={user} />
            <HStack spacing={2}>
              <UserButtonFollow user={user} />
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}
