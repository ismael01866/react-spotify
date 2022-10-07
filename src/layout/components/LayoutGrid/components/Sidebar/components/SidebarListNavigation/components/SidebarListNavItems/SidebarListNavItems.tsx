import { List } from '@chakra-ui/react';
import { SidebarListItem } from '../SidebarListItem';
import { data } from './data';

export const SidebarListNavItems = () => {
  return (
    <List spacing={2}>
      {data.map((item, index) => {
        return <SidebarListItem key={index} item={item} />;
      })}
    </List>
  );
};
