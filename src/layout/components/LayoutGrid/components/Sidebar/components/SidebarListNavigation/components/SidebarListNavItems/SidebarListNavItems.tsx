import { List } from '@chakra-ui/react';

import { SidebarItem } from '../SidebarItem';

import { data } from './data';

export const SidebarListNavItems = () => {
  return (
    <List gap={2} w={'full'}>
      {data.map((item, index) => {
        return <SidebarItem key={index} item={item} />;
      })}
    </List>
  );
};
