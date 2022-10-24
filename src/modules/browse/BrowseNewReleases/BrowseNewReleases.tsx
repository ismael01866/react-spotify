import { useContext } from 'react';
import { Flex } from '@chakra-ui/react';

import { useBrowseNewReleases } from 'hooks/services';
import { BrowseNewReleasesContext, UserContext } from 'state';

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
