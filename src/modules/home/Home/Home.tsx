import { Flex } from '@chakra-ui/react';
import { HomeContent, HomeHeader } from './components';

export function Home() {
  return (
    <Flex flexDirection={'column'} gap={16}>
      <HomeHeader />
      <HomeContent />
    </Flex>
  );
}
