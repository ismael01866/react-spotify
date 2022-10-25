import { useContext } from 'react';
import { Box, HStack, Image, VStack } from '@chakra-ui/react';

import { HeaderBanner, HeaderMetaImage } from 'components/Header';
import { UserButtonFollow, UserEmptySkeleton } from 'modules/user/components';
import { SessionContext, UserContext } from 'state';

import { UserMeta } from './components';

export function UserHeader() {
  const user = useContext(UserContext);
  const { images, display_name } = user;

  const {
    user: { id }
  } = useContext(SessionContext);

  const userIsMe = id === user?.id;

  return (
    <Box pos={'relative'} mx={-12} mt={-12}>
      <Box boxSize={'full'} overflow={'hidden'} pos={'absolute'}>
        <HeaderBanner>
          <Image src={images?.[0]?.url} alt={display_name} />
        </HeaderBanner>
      </Box>

      <Box px={12} pt={24} pos={'relative'}>
        <HStack gap={8}>
          <HeaderMetaImage mb={-4}>
            <Image
              alt={display_name}
              src={images?.[0]?.url}
              fallback={<UserEmptySkeleton />}
            />
          </HeaderMetaImage>

          <VStack alignItems={'flex-start'} gap={8}>
            <UserMeta user={user} />
            {!userIsMe && (
              <HStack gap={2}>
                <UserButtonFollow user={user} />
              </HStack>
            )}
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}
