import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react';
import { ArtistGridAlbums, ArtistGridSingles } from './components';

export function ArtistAlbums() {
  return (
    <>
      <Tabs colorScheme={'gray'} size={'sm'} variant={'solid-rounded'}>
        <TabList>
          <Tab>Albums</Tab>
          <Tab>Singles and EPs</Tab>
        </TabList>

        <br />
        <TabPanels>
          <TabPanel p={0}>
            <ArtistGridAlbums
              limit={3}
              columns={{ base: 1, sm: 2, md: 3 }}
            />
          </TabPanel>
          <TabPanel p={0}>
            <ArtistGridSingles
              limit={3}
              columns={{ base: 1, sm: 2, md: 3 }}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
