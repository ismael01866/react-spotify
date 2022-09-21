import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react';
import {
  LibraryAlbums,
  LibraryArtists,
  LibraryPlaylists
} from './components';

export function Library() {
  return (
    <Tabs
      display={'flex'}
      flexDirection={'column'}
      gap={12}
      variant={'solid-rounded'}
      isLazy
      lazyBehavior={'keepMounted'}
    >
      <TabList>
        <Tab>Playlists</Tab>
        <Tab>Artists</Tab>
        <Tab>Albums</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <LibraryPlaylists />
        </TabPanel>
        <TabPanel>
          <LibraryArtists />
        </TabPanel>
        <TabPanel>
          <LibraryAlbums />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
