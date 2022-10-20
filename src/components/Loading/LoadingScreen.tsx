import { Center, Spinner } from '@chakra-ui/react';

export function LoadingScreen() {
  return (
    <Center h={'100vh'} w={'100vw'}>
      <Spinner color={'spotify.500'} size={'xl'} />
    </Center>
  );
}
