import { useSelector } from 'react-redux';
import { selectDeviceID } from 'src/layout/components/Player/playerSlice';

import {
  AspectRatio,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  VStack
} from '@chakra-ui/react';

import { Card } from 'components/Card';
import { FaPlay } from 'react-icons/fa';

import { IArtist } from 'src/types/artist';

export interface CardArtistProps {
  artist: IArtist;
  [others: string]: any;
}

export function CardArtist(props: CardArtistProps) {
  const { artist, ...others } = props;
  const { name, uri, images, followers } = artist;

  const device_id = useSelector(selectDeviceID);
  const context_uri = uri;

  const handleOnClick = async () => {
    fetch('api/spotify/me/player/play', {
      method: 'POST',
      body: JSON.stringify({ device_id, context_uri })
    });
  };

  return (
    <Card position={'relative'} role={'group'} {...others}>
      <AspectRatio
        borderRadius={'base'}
        overflow={'hidden'}
        ratio={4 / 3}
      >
        <Image alt={name} src={images[0].url} />
      </AspectRatio>

      <HStack
        bg={'blackAlpha.700'}
        pos={'absolute'}
        bottom={0}
        left={0}
        justifyContent={'space-between'}
        p={4}
        spacing={4}
        w={'full'}
        _groupHover={{ bg: 'blackAlpha.800' }}
      >
        <VStack alignItems={'flex-start'} spacing={1}>
          <Heading fontSize={'md'} noOfLines={1}>
            {name}
          </Heading>
          <Text color={'text.base'} fontSize={'sm'} noOfLines={1}>
            {followers.total.toLocaleString()} followers
          </Text>
        </VStack>

        <IconButton
          aria-label={'play'}
          colorScheme={'spotify'}
          icon={<FaPlay />}
          opacity={0}
          _groupHover={{ opacity: 1 }}
          onClick={handleOnClick}
        />
      </HStack>
    </Card>
  );
}
