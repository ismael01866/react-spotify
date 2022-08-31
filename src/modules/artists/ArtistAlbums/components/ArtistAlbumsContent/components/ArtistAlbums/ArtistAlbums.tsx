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
import { useArtistAlbums } from 'src/utils/hooks/services';

export function ArtistAlbums() {
  const { id: artistID } = useContext(ArtistContext);

  const limit = 6;

  const { albums, isLoading: isLoadingAlbums } = useArtistAlbums(
    artistID,
    {
      limit,
      include_groups: 'album'
    }
  );

  const { albums: singles, isLoading: isLoadingSingles } =
    useArtistAlbums(artistID, {
      limit,
      include_groups: 'single'
    });

  const skeletonData = new Array(limit).fill('');

  const albumsData = isLoadingAlbums ? skeletonData : albums;
  const singlesData = isLoadingSingles ? skeletonData : singles;

  return (
    <Tabs colorScheme={'gray'} size={'sm'} variant={'solid-rounded'}>
      <TabList>
        <Tab>Albums</Tab>
        <Tab>Singles and EPs</Tab>
      </TabList>

      <br />
      <TabPanels>
        <TabPanel p={0}>
          {albumsData && (
            <ArtistGridAlbums
              data={albumsData}
              columns={{ base: 1, sm: 2, xl: 3 }}
            />
          )}
        </TabPanel>

        <TabPanel p={0}>
          {singlesData && (
            <ArtistGridSingles
              data={singlesData}
              columns={{ base: 1, sm: 2, xl: 3 }}
            />
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
