import { Flex, Heading, HStack } from '@chakra-ui/react';
import moment from 'moment';
import { IPlaylist } from 'src/types/playlist';
import { pluralize } from 'src/utils/helpers';

export interface PlaylistMetaProps {
  playlist: IPlaylist;
}

export function PlaylistMeta(props: PlaylistMetaProps) {
  const { playlist } = props;
  const { name, owner, tracks, total_duration } = playlist;

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
        <Heading fontSize={'sm'} noOfLines={1}>
          {owner?.display_name}
        </Heading>

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
