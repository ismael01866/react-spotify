import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { Avatar, Flex, Heading, HStack } from '@chakra-ui/react';

import { User } from 'models';
import { User as UserProps } from 'types/user';

export interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  const { data } = useSession();
  const [user, setUser] = useState<UserProps>();

  useEffect(() => {
    setUser(
      new User({
        name: data?.user?.name || '',
        image: data?.user?.image || ''
      })
    );
  }, [data]);

  return (
    <Flex p={4} w={'full'}>
      <HStack
        bg={'blackAlpha.800'}
        p={1}
        pr={4}
        rounded={'full'}
        ml={'auto'}
      >
        <Avatar name={user?.name} src={user?.image} size={'sm'} />
        <Heading fontSize={'sm'} noOfLines={1}>
          {user?.name}
        </Heading>
      </HStack>
    </Flex>
  );
}
