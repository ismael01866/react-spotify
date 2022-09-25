import { Flex } from '@chakra-ui/react';

interface CardMetaProps {
  [others: string]: any;
}

export function CardMeta(props: CardMetaProps) {
  const { ...others } = props;

  return <Flex bg={'bg.900'} mt={4} w={'full'} {...others}></Flex>;
}
