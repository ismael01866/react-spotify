import {
  Box,
  Center,
  Icon,
  useStyleConfig,
  useTheme
} from '@chakra-ui/react';

interface EmptySkeletonProps {
  icon?: any;
  [others: string]: any;
}

export function EmptySkeleton(props: EmptySkeletonProps) {
  const { icon, ...others } = props;

  const theme = useTheme();
  const styles = useStyleConfig('Skeleton');

  const defaultBackground =
    theme.components.Skeleton.defaultProps.colorScheme;

  return (
    <Box
      __css={styles}
      bg={`${defaultBackground}.700`}
      boxSize={'full'}
      {...others}
    >
      <Center boxSize={'full'}>
        <Icon
          as={icon}
          boxSize={'40%'}
          color={`${defaultBackground}.400`}
        />
      </Center>
    </Box>
  );
}
