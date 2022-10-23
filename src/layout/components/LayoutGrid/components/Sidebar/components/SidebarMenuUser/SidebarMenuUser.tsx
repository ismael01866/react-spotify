import { Avatar, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import { default as NextLink } from 'next/link';
import { useContext } from 'react';
import { UserContext } from 'src/state';

export function SidebarMenuUser() {
  const { display_name, images } = useContext(UserContext);

  return (
    <Menu placement={'bottom-end'}>
      <MenuButton>
        <Avatar name={display_name} src={images?.[0]?.url} size={'sm'} />
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
