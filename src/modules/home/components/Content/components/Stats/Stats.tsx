import {
  HStack,
  Skeleton,
  Stat,
  StatLabel,
  StatNumber
} from '@chakra-ui/react';

import { Card } from 'components';
import { User } from 'types/user';

export interface StatsProps {
  user: User;
  isLoading: boolean;
}

export function Stats(props: StatsProps) {
  const {
    user: { public_repos, followers, following },
    isLoading
  } = props;

  return (
    <Skeleton isLoaded={!isLoading} w={'full'}>
      <Card h={36} w={'full'}>
        <HStack alignItems={'stretch'} flex={1} spacing={0}>
          <StatItem label={'Repos'} count={public_repos} />
          <StatItem label={'Followers'} count={followers} />
          <StatItem label={'Following'} count={following} />
        </HStack>
      </Card>
    </Skeleton>
  );
}

function StatItem(props: { label: string; count?: number }) {
  const { label, count } = props;

  return (
    <Stat
      borderLeft={'1px solid'}
      borderColor={'border.base'}
      _first={{ borderLeft: 0 }}
      p={8}
    >
      <StatNumber fontSize={'3xl'} noOfLines={1}>
        {count?.toLocaleString()}
      </StatNumber>
      <StatLabel>{label}</StatLabel>
    </Stat>
  );
}
