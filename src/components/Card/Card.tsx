import { Box, useStyleConfig } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  [others: string]: any;
}

export function Card(props: CardProps) {
  const { ...others } = props;
  const styles = useStyleConfig('Card');

  return <Box __css={styles} {...others}></Box>;
}
