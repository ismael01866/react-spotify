import {
  Box,
  Icon,
  IconButton,
  List,
  ListItem
} from '@chakra-ui/react';

import { default as NextLink } from 'next/link';

import { IconType } from 'react-icons';
import { data } from './data';

export interface SidebarProps {}

export function Sidebar(props: SidebarProps) {
  return (
    <Box p={4} w={20}>
      <List spacing={4}>
        {data.map((item, index) => {
          return <Item key={index} item={item} />;
        })}
      </List>
    </Box>
  );
}

export interface SidebarItemProps {
  label: string;
  href: string;
  icon: IconType;
}

function Item(props: { item: SidebarItemProps }) {
  const {
    item: { label, href, icon }
  } = props;

  return (
    <ListItem>
      <NextLink href={href}>
        <IconButton
          aria-label={label}
          color={'text.muted'}
          variant={'ghost'}
          _hover={{
            color: 'text.base'
          }}
        >
          <Icon as={icon} boxSize={6} />
        </IconButton>
      </NextLink>
    </ListItem>
  );
}
