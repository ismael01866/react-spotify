import { signOut } from 'next-auth/react';
import { useSelector } from 'react-redux';
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
import { selectUser } from 'src/modules';

export function MenuUser() {
  const user = useSelector(selectUser);

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
  const { display_name, images } = user;

  return (
    <MenuButton as={Button} rightIcon={<FaAngleDown />} maxW={'4xs'}>
      <HStack>
        <Avatar
          name={display_name}
          src={images?.[0]?.url}
          size={'sm'}
        />
        <Heading
          fontSize={'sm'}
          noOfLines={1}
          sx={{ display: 'block' }}
        >
          {display_name}
        </Heading>
      </HStack>
    </MenuButton>
  );
}
