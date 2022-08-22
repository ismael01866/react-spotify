import {
  Heading,
  HStack,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react';
import { default as NextLink } from 'next/link';
import { useContext } from 'react';
import { ArtistContext } from 'src/features/artist/ArtistContext';
import { ArtistGridAlbums } from './components';
import { ArtistGridSingles } from './components/ArtistGridSingles';

export function ArtistAlbums() {
  const { artistID } = useContext(ArtistContext);

  return (
    <>
      <HStack justifyContent={'space-between'}>
        <Heading fontSize={'2xl'}>Top Albums</Heading>

        <NextLink href={`/artists/${artistID}/albums`}>
          <Link ml={'auto'}>See all</Link>
        </NextLink>
      </HStack>

      <br />
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
              columns={{ base: 1, sm: 2, xl: 3 }}
            />
          </TabPanel>
          <TabPanel p={0}>
            <ArtistGridSingles
              limit={3}
              columns={{ base: 1, sm: 2, xl: 3 }}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
