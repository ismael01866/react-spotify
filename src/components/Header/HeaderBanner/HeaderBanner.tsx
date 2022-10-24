import { ReactNode } from 'react';
import { AspectRatio, AspectRatioProps } from '@chakra-ui/react';

import styles from './HeaderBanner.module.scss';

interface HeaderBannerProps extends AspectRatioProps {
  children?: ReactNode;
  [others: string]: any;
}

export function HeaderBanner(props: HeaderBannerProps) {
  const { children, ...others } = props;

  return (
    <AspectRatio
      className={styles.banner}
      h={'full'}
      ratio={16 / 9}
      {...others}
    >
      {children}
    </AspectRatio>
  );
}
