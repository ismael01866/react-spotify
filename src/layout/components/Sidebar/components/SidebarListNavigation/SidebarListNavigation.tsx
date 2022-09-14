import { List } from '@chakra-ui/react';
import { SidebarListNavigationItem } from './components';
import { data } from './data';

export function SidebarListNavigation() {
  return (
    <List spacing={4}>
      {data.map((item, index) => {
        return <SidebarListNavigationItem key={index} item={item} />;
      })}
    </List>
  );
}
