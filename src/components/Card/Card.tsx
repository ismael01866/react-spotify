import { Box, BoxProps, forwardRef, useStyleConfig } from '@chakra-ui/react';

export const Card = forwardRef<BoxProps, 'div'>((props, ref) => {
  const { ...others } = props;
  const styles = useStyleConfig('Card');

  return <Box __css={styles} ref={ref} {...others}></Box>;
});
