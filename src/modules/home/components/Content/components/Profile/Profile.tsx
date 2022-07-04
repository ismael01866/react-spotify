import {
  Avatar,
  Heading,
  HStack,
  Link,
  Skeleton,
  VStack
} from '@chakra-ui/react';
import { Card } from 'components';

import { User } from 'types/user';

export interface ProfileProps {
  user: User;
  isLoading: boolean;
}

export function Profile(props: ProfileProps) {
  const {
    user: { avatar_url, name, login, html_url },
    isLoading
  } = props;

  return (
    <Skeleton isLoaded={!isLoading} w={'full'}>
      <Card h={40} overflow={'hidden'}>
        <HStack flex={1} spacing={0}>
          <Avatar
            borderRadius={0}
            boxSize={40}
            name={name}
            src={avatar_url}
          />

          <VStack flex={1} px={8} py={4} textAlign={'center'}>
            {name && (
              <Heading noOfLines={2} size={'lg'}>
                {name}
              </Heading>
            )}

            {login && (
              <Link noOfLines={1} href={html_url}>
                @{login}
              </Link>
            )}
          </VStack>
        </HStack>
      </Card>
    </Skeleton>
  );
}
