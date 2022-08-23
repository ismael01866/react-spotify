import { Box, Center, Icon, useStyleConfig } from '@chakra-ui/react';

export interface CardTrackProps {
  icon?: any;
  [others: string]: any;
}

export function EmptySkeleton(props: CardTrackProps) {
  const { icon, ...others } = props;
  const styles = useStyleConfig('Skeleton');

  return (
    <Box
      __css={styles}
      bg={'gray.900'}
      boxSize={'full'}
      opacity={1}
      {...others}
    >
      <Center boxSize={'full'}>
        <Icon as={icon} boxSize={'40%'} color={'gray.600'} />
      </Center>
    </Box>
  );
}
