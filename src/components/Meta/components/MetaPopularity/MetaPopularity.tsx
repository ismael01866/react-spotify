import { HStack, Icon, Text, Tooltip } from '@chakra-ui/react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface CardMetaPopularityProps {
  popularity?: number;
}

export function MetaPopularity(props: CardMetaPopularityProps) {
  const { popularity = 0 } = props;

  const parsedPopularity = Math.round(popularity / 10);
  const icon =
    parsedPopularity > 6
      ? FaStar
      : popularity === 0
      ? FaRegStar
      : FaStarHalfAlt;

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
