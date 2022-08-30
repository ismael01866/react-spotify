import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react';
import { useContext } from 'react';
import { ArtistContext } from 'src/modules/artists/Artist/ArtistContext';
import {
  ArtistGridAlbums,
  ArtistGridSingles
} from 'src/modules/artists/components';

export function ArtistAlbums() {
  const { id: artistID } = useContext(ArtistContext);

  return (
    <Tabs colorScheme={'gray'} size={'sm'} variant={'solid-rounded'}>
      <TabList>
        <Tab>Albums</Tab>
        <Tab>Singles and EPs</Tab>
      </TabList>

      <br />
      <TabPanels>
        <TabPanel p={0}>
          {artistID && (
            <ArtistGridAlbums
              artistID={artistID}
              limit={3}
              columns={{ base: 1, sm: 2, md: 3 }}
            />
          )}
        </TabPanel>

        <TabPanel p={0}>
          {artistID && (
            <ArtistGridSingles
              artistID={artistID}
              limit={3}
              columns={{ base: 1, sm: 2, md: 3 }}
            />
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
