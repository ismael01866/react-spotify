import { Avatar, Flex, Heading, HStack, Link } from '@chakra-ui/react';
import moment from 'moment';
import { default as NextLink } from 'next/link';
import { IPlaylist } from 'src/types/playlist';
import { pluralize } from 'src/utils/helpers';
import { useUserIsMe } from 'src/utils/hooks';
import { useUser } from 'src/utils/hooks/services';

interface PlaylistMetaProps {
  playlist: IPlaylist;
}

export function PlaylistMeta(props: PlaylistMetaProps) {
  const { playlist } = props;
  const { name, owner, tracks, total_duration } = playlist;

  const { user } = useUser(owner?.id);
  const { userIsMe } = useUserIsMe(user?.id);

  return (
    <Flex direction={'column'}>
      <Heading
        color={'text.muted'}
        fontSize={'xs'}
        letterSpacing={2}
        mb={1}
      >
        PUBLIC PLAYLIST
      </Heading>
      <Heading noOfLines={1}>{name}</Heading>

      <HStack
        alignItems={'center'}
        color={'text.base'}
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
                href={userIsMe ? '/users/me' : `users/${user?.id}`}
                passHref
              >
                <Link color={'text.body'}>{user?.display_name}</Link>
              </NextLink>
            </Heading>
          </HStack>
        )}

        <Heading fontSize={'sm'}>
          {pluralize('song', tracks?.total)}
        </Heading>

        <Heading fontSize={'sm'} noOfLines={1}>
          {moment(total_duration).format('h')} hr{' '}
          {moment(total_duration).format('mm')} min
        </Heading>
      </HStack>
    </Flex>
  );
}
