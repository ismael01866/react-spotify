import { List } from '@chakra-ui/react';
import { useMePlaylistsAll } from 'src/utils/hooks/services';
import { SidebarPlaylistItem } from './components/SidebarPlaylistItem';

export const SidebarListPlaylistItems = () => {
  const { isLoading, playlists } = useMePlaylistsAll({
    sort: 'name'
  });

  const skeletonData = new Array(3).fill('');
  const data = isLoading ? skeletonData : playlists;

  return (
    <List
      display={'flex'}
      flexDirection={'column'}
      minH={'xs'}
      overflow={'hidden auto'}
      spacing={2}
      sx={{
        scrollbarWidth: 'thin'
      }}
    >
      {data?.map((item, index) => {
        return <SidebarPlaylistItem key={index} item={item} />;
      })}
    </List>
  );
};
