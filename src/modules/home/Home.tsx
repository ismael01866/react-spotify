import { useState } from 'react';

import { Container, Flex, VStack } from '@chakra-ui/react';

import { Content } from './components/Content';
import { Search } from './components/Search';

import { User } from 'types/user';

export function Home() {
  const [user, setUser] = useState<User>({});
  const [search, setSearch] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Flex bg={'bg.lt'} h={'100vh'} w={'100vw'}>
      <Container display={'flex'} maxW={'xl'}>
        <VStack flex={1} p={8} spacing={8}>
          <Search
            setUser={setUser}
            setSearch={setSearch}
            setIsLoading={setIsLoading}
          />
          <Content user={user} search={search} isLoading={isLoading} />
        </VStack>
      </Container>
    </Flex>
  );
}
