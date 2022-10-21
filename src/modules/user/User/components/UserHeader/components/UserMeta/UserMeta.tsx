import { Flex, Heading, HStack } from '@chakra-ui/react';
import { IUser } from 'src/types/user';

interface UserMetaProps {
  user: IUser;
}

export function UserMeta(props: UserMetaProps) {
  const { user } = props;
  const { display_name, followers } = user;

  return (
    <Flex direction={'column'}>
      <Heading color={'text.base'} fontSize={'xs'} letterSpacing={2}>
        PROFILE
      </Heading>

      <Heading noOfLines={1} lineHeight={'initial'} size={'3xl'}>
        {display_name}
      </Heading>

      <Heading color={'text.base'} fontSize={'sm'} mt={4}>
        {followers?.total?.toLocaleString()} followers
      </Heading>
    </Flex>
  );
}
