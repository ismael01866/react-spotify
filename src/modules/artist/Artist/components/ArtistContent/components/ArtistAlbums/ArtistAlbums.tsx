import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react';
import { useContext } from 'react';
import { AlbumGrid } from 'src/modules/album/components';
import { ArtistContext } from 'src/state';
import { useArtistAlbums } from 'src/utils/hooks/services';

export function ArtistAlbums() {
  const { id: artistID } = useContext(ArtistContext);

  const limit = 6;
  const { albums, isLoadingInitialData: isLoadingAlbums } = useArtistAlbums(
    artistID,
    {
      limit,
      include_groups: 'album'
    }
  );

  const { albums: singles, isLoadingInitialData: isLoadingSingles } =
    useArtistAlbums(artistID, {
      limit,
      include_groups: 'single'
    });

  const skeletonData = new Array(limit).fill('');

  const albumsData = isLoadingAlbums ? skeletonData : albums;
  const singlesData = isLoadingSingles ? skeletonData : singles;

  return (
    ((!!albumsData?.length || !!singlesData?.length) && (
      <Tabs size={'sm'} variant={'solid-rounded'}>
        <TabList>
          {!!albumsData?.length && <Tab>Albums</Tab>}
          {!!singlesData?.length && <Tab>Singles and EPs</Tab>}
        </TabList>

        <br />
        <TabPanels>
          {!!albumsData?.length && (
            <TabPanel p={0}>
              <AlbumGrid
                albums={albumsData}
                columns={{ base: 1, sm: 2, xl: 3 }}
              />
            </TabPanel>
          )}

          {!!singlesData?.length && (
            <TabPanel p={0}>
              {singlesData && (
                <AlbumGrid
                  albums={singlesData}
                  columns={{ base: 1, sm: 2, xl: 3 }}
                />
              )}
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    )) || (
      <Heading color={'text.muted'} size={'sm'}>
        No information available
      </Heading>
    )
  );
}
