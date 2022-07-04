import { VStack } from '@chakra-ui/react';
import { Profile, Stats } from './components';

import { User } from 'types/user';

export interface ContentProps {
  user: User;
  search: string;
  isLoading: boolean;
}

export function Content(props: ContentProps) {
  const { user, search, isLoading } = props;

  return (
    <>
      {search && (
        <VStack spacing={6} w={'full'}>
          <Profile isLoading={isLoading} user={user} />
          <Stats isLoading={isLoading} user={user} />
        </VStack>
      )}
    </>
  );
}
