import { Flex, Heading, HStack } from '@chakra-ui/react';
import { IUser } from 'src/types/user';
import { utilPluralize } from 'src/utils/helpers';

interface UserMetaProps {
  user: IUser;
}

export function UserMeta(props: UserMetaProps) {
  const { user } = props;
  const { display_name, followers } = user;

  return (
    <Flex direction={'column'}>
      <Heading
        color={'text.muted'}
        fontSize={'xs'}
        letterSpacing={2}
        mb={1}
      >
        PROFILE
      </Heading>
      <Heading noOfLines={1}>{display_name}</Heading>

      <HStack color={'text.base'} mt={4}>
        <Heading fontSize={'sm'} noOfLines={1}>
          {utilPluralize('Follower', followers?.total)}
        </Heading>
      </HStack>
    </Flex>
  );
}
