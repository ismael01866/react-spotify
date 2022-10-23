import {
  AspectRatio,
  Box,
  BoxProps,
  Center,
  Icon,
  useStyleConfig,
  useTheme
} from '@chakra-ui/react';

interface EmptySkeletonProps extends BoxProps {
  icon?: any;
  [others: string]: any;
}

export function EmptySkeleton(props: EmptySkeletonProps) {
  const { icon, ...others } = props;

  const theme = useTheme();
  const styles = useStyleConfig('Skeleton');

  const defaultBackground = theme.components.Skeleton.defaultProps.colorScheme;

  return (
    <Box
      __css={styles}
      bg={`${defaultBackground}.700`}
      boxSize={'full'}
      opacity={1}
      {...others}
    >
      <AspectRatio
        borderRadius={'base'}
        boxSize={'full'}
        overflow={'hidden'}
        ratio={4 / 4}
      >
        <Center boxSize={'full'}>
          {icon && (
            <Icon
              as={icon}
              boxSize={'40%'}
              color={`${defaultBackground}.400`}
            />
          )}
        </Center>
      </AspectRatio>
    </Box>
  );
}
