import { Icon, IconButton, ListItem, Tooltip } from '@chakra-ui/react';
import { capitalize } from 'lodash';
import { default as NextLink } from 'next/link';
import { IconType } from 'react-icons';

interface SidebarListNavigationItemProps {
  label: string;
  href: string;
  icon: IconType;
}

export const SidebarListNavigationItem = (props: {
  item: SidebarListNavigationItemProps;
}) => {
  const {
    item: { label, href, icon }
  } = props;

  return (
    <Tooltip label={capitalize(label)} placement={'end'}>
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
    </Tooltip>
  );
};
