import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react';

export function Library() {
  return (
    <Flex>
      <Tabs variant={'solid-rounded'} isLazy>
        <TabList>
          <Tab>Playlists</Tab>
          <Tab>Podcasts</Tab>
          <Tab>Artists</Tab>
          <Tab>Albums</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
          <TabPanel>
            <p>albums</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
