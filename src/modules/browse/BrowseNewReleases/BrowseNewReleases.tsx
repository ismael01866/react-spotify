import { Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import { BrowseNewReleasesContext, UserContext } from 'src/state';
import { useBrowseNewReleases } from 'src/hooks/services';
import {
  BrowseNewReleasesContent,
  BrowseNewReleasesHeader
} from './components';

export function BrowseNewReleases() {
  const { country } = useContext(UserContext);
  const limit = 50;

  const { albums = [], isLoading } = useBrowseNewReleases({
    limit,
    country
  });

  return (
    (!isLoading && (
      <Flex flexDirection={'column'} gap={12}>
        <BrowseNewReleasesContext.Provider value={{ albums }}>
          <BrowseNewReleasesHeader />
          <BrowseNewReleasesContent />
        </BrowseNewReleasesContext.Provider>
      </Flex>
    )) || <></>
  );
}
