import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { HStack, Icon, Text, Tooltip } from '@chakra-ui/react';

interface CardMetaPopularityProps {
  popularity?: number;
}

export function MetaPopularity(props: CardMetaPopularityProps) {
  const { popularity = 0 } = props;

  const parsedPopularity = Math.round(popularity / 10);
  const icon = getPopularityIcon(parsedPopularity);

  return (
    <Tooltip label={`Popularity ${parsedPopularity}/10`} placement={'top'}>
      <HStack>
        <Icon as={icon} color={'orange.300'} />

        <Text color={'text.base'} fontWeight={'semibold'} fontSize={'xs'}>
          {parsedPopularity}
        </Text>
      </HStack>
    </Tooltip>
  );
}

export function getPopularityIcon(popularity: number) {
  if (!popularity) return FaRegStar;

  return popularity > 6 ? FaStar : FaStarHalfAlt;
}
