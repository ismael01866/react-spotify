import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import {
  Avatar,
  Button,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react';

import { FaAngleDown } from 'react-icons/fa';

import { IUser } from 'types/user';

export interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<IUser>({});

  useEffect(() => {
    if (status !== 'authenticated') return;

    const user = {
      name: session?.user?.name || '',
      image: session?.user?.image || ''
    };

    setUser(user);
  }, [session, status]);

  const handleLogout = () => signOut();

  return (
    <Flex px={12} py={4} w={'full'}>
      <Menu placement={'bottom-end'}>
        <ChildMenuButton user={user} />
        <MenuList>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

function ChildMenuButton({ user }: { user: IUser }) {
  const { name, image } = user;

  return (
    <MenuButton
      as={Button}
      ml={'auto'}
      p={1}
      pr={4}
      rounded={'full'}
      rightIcon={<FaAngleDown />}
      maxW={'4xs'}
    >
      <HStack>
        <Avatar name={name} src={image} size={'sm'} />
        <Heading
          fontSize={'sm'}
          noOfLines={1}
          sx={{ display: 'block' }}
        >
          {name}
        </Heading>
      </HStack>
    </MenuButton>
  );
}
