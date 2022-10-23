import {
  Skeleton as ChakraSkeleton,
  SkeletonProps,
  useStyleConfig,
  useTheme
} from '@chakra-ui/react';

export function Skeleton(props: SkeletonProps) {
  const theme = useTheme();
  const styles = useStyleConfig('Skeleton');

  const defaultBackground = theme.components.Skeleton.defaultProps.colorScheme;

  const baseProps = {
    endColor: `${defaultBackground}.700`,
    startColor: `${defaultBackground}.900`,
    ...props
  };

  return <ChakraSkeleton _css={styles} {...baseProps} />;
}
