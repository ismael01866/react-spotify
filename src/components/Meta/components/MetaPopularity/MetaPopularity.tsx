import { HStack, Icon, Text, Tooltip } from '@chakra-ui/react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface CardMetaProps {
  popularity?: number;
}

export function MetaPopularity(props: CardMetaProps) {
  const { popularity = 0 } = props;

  const parsedPopularity = Math.round(popularity / 10);
  const isPopular = parsedPopularity > 6;

  const icon = isPopular ? FaStar : FaStarHalfAlt;

  return (
    <Tooltip
      label={`Popularity ${parsedPopularity}/10`}
      placement={'top'}
    >
      <HStack>
        <Icon as={icon} color={'orange.300'} />

        <Text
          color={'text.base'}
          fontWeight={'semibold'}
          fontSize={'xs'}
        >
          {parsedPopularity}
        </Text>
      </HStack>
    </Tooltip>
  );
}
