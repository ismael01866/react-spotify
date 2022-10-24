import { useContext } from 'react';
import { Avatar, Flex, Heading, HStack, Link } from '@chakra-ui/react';
import moment from 'moment';
import { default as NextLink } from 'next/link';

import { useUser } from 'hooks/services';
import { SessionContext } from 'state';
import { IPlaylist } from 'types/playlist';
import { utilPluralize } from 'utils/helpers';

interface PlaylistMetaProps {
  playlist: IPlaylist;
}

export function PlaylistMeta(props: PlaylistMetaProps) {
  const { playlist } = props;
  const { name, owner, tracks, total_duration } = playlist;

  const { user } = useUser(owner?.id);
  const {
    user: { id }
  } = useContext(SessionContext);

  const userIsMe = id === user?.id;

  return (
    <Flex direction={'column'}>
      <Heading color={'text.base'} fontSize={'xs'} letterSpacing={2}>
        PUBLIC PLAYLIST
      </Heading>

      <Heading noOfLines={1} lineHeight={'initial'} size={'3xl'}>
        {name}
      </Heading>

      <HStack
        alignItems={'center'}
        divider={<span>&bull;</span>}
        mt={4}
        gap={1}
      >
        {user?.id && (
          <HStack>
            <Avatar
              name={user?.display_name}
              src={user?.images?.[0]?.url}
              size={'xs'}
            />
            <Heading fontSize={'sm'} noOfLines={1}>
              <NextLink
                href={userIsMe ? '/users/me' : `/users/${user?.id}`}
                passHref
              >
                <Link color={'text.body'}>{user?.display_name}</Link>
              </NextLink>
            </Heading>
          </HStack>
        )}

        <Heading color={'text.base'} fontSize={'sm'}>
          {utilPluralize('song', tracks?.total)}
        </Heading>

        <Heading color={'text.base'} fontSize={'sm'}>
          {moment(total_duration).format('h')} hr{' '}
          {moment(total_duration).format('mm')} min
        </Heading>
      </HStack>
    </Flex>
  );
}
