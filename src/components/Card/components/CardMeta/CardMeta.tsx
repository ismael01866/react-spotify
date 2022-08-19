import { Flex } from '@chakra-ui/react';

export interface CardMetaProps {
  [others: string]: any;
}

export function CardMeta(props: CardMetaProps) {
  const { ...others } = props;

  return (
    <Flex
      bg={'bg.900'}
      justifyContent={'space-between'}
      p={4}
      w={'full'}
      {...others}
    ></Flex>
  );
}
