import { FaSpotify } from 'react-icons/fa';
import { Button, Center, Icon, VStack } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';

export function SignIn() {
  const handleOnClick = () => {
    signIn('spotify', {
      callbackUrl: 'http://localhost:3000'
    });
  };

  return (
    <Center h={'100vh'} w={'100vw'}>
      <VStack spacing={12}>
        <Button
          colorScheme={'spotify'}
          rounded={'full'}
          size={'lg'}
          onClick={handleOnClick}
        >
          <Icon as={FaSpotify} /> &nbsp; Continue with Spotify
        </Button>
      </VStack>
    </Center>
  );
}
