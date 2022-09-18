import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react';
import { LibraryAlbums, LibraryArtists } from './components';

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
        <Tab>Podcasts</Tab>
        <Tab>Artists</Tab>
        <Tab>Albums</Tab>
      </TabList>

      <TabPanels height={'full'} overflow={'hidden'}>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel height={'full'} overflow={'hidden'} p={0}>
          <LibraryArtists />
        </TabPanel>
        <TabPanel>
          <LibraryAlbums />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
