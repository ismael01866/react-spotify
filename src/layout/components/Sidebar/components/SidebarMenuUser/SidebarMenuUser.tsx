import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import { default as NextLink } from 'next/link';
import { useSelector } from 'react-redux';
import { selectUser } from 'src/modules';

export function SidebarMenuUser() {
  const user = useSelector(selectUser);
  const { display_name, images } = user;

  return (
    <Menu placement={'bottom-end'}>
      <MenuButton>
        <Avatar
          name={display_name}
          src={images?.[0]?.url}
          size={'sm'}
        />
      </MenuButton>

      <MenuList>
        <NextLink href={'/users/me'}>
          <MenuItem>Profile</MenuItem>
        </NextLink>
        <MenuItem onClick={() => signOut()}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}
