import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

import {
  Avatar,
  Button,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react';
import { FaAngleDown } from 'react-icons/fa';

import { IUser } from 'src/types/user';

export interface MenuUserProps {}

export function MenuUser(props: MenuUserProps) {
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

  return (
    <Menu placement={'bottom-end'}>
      <ChildMenuButton user={user} />
      <MenuList>
        <MenuItem onClick={() => signOut()}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}

function ChildMenuButton({ user }: { user: IUser }) {
  const { name, image } = user;

  return (
    <MenuButton as={Button} rightIcon={<FaAngleDown />} maxW={'4xs'}>
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
