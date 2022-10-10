import { Icon, IconButton, ListItem, Tooltip } from '@chakra-ui/react';
import { capitalize } from 'lodash';
import { default as NextLink } from 'next/link';
import { useRouter } from 'next/router';
import { IconType } from 'react-icons';

interface SidebarItemProps {
  item: {
    label: string;
    href: string;
    icon: IconType;
  };
}

export const SidebarItem = (props: SidebarItemProps) => {
  const {
    item: { label, href, icon }
  } = props;

  const router = useRouter();

  const isCurrentRoute = router.pathname === href;

  return (
    <Tooltip
      label={capitalize(label)}
      offset={[0, -16]}
      placement={'end'}
    >
      <ListItem
        pl={4}
        position={'relative'}
        _before={{
          borderLeft: '3px solid',
          borderColor: isCurrentRoute ? 'spotify.500' : 'transparent',
          content: "''",
          height: '1.5rem',
          left: '0',
          top: '50%',
          transform: 'translateY(-50%)',
          position: 'absolute'
        }}
      >
        <NextLink href={href}>
          <IconButton
            aria-label={label}
            color={isCurrentRoute ? 'spotify.500' : 'text.muted'}
            variant={'ghost'}
            _hover={{
              color: isCurrentRoute ? 'spotify.500' : 'text.base'
            }}
          >
            <Icon as={icon} boxSize={6} />
          </IconButton>
        </NextLink>
      </ListItem>
    </Tooltip>
  );
};
