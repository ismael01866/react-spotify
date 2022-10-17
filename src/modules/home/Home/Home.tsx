import { Flex } from '@chakra-ui/react';
import {
  HomeHeader
  // HomeContent,
} from './components';

export function Home() {
  return (
    <Flex flexDirection={'column'} gap={12}>
      <HomeHeader />
    </Flex>
  );
}
