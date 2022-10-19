import { AspectRatioProps, Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import styles from './HeaderMetaImage.module.scss';

interface HeaderMetaImageProps extends AspectRatioProps {
  children?: ReactNode;
  [others: string]: any;
}

export function HeaderMetaImage(props: HeaderMetaImageProps) {
  const { children, ...others } = props;

  return (
    <Box
      className={styles['header-meta-image']}
      borderRadius={'lg'}
      boxShadow={'dark-lg'}
      h={'2xs'}
      overflow={'hidden'}
      pos={'relative'}
      w={'4xs'}
      {...others}
    >
      {children}
    </Box>
  );
}
