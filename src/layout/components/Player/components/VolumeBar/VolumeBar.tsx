import { useContext, useEffect, useState } from 'react';
import { PlayerContext } from 'src/features';

import {
  HStack,
  Icon,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack
} from '@chakra-ui/react';
import { FaVolumeDown } from 'react-icons/fa';

export interface VolumeBarProps {}

export function VolumeBar(props: VolumeBarProps) {
  const { player } = useContext(PlayerContext);

  const [volume, setVolume] = useState(0);
  const [showThumb, setShowThumb] = useState(false);

  useEffect(() => {
    if (!player) return;

    player.getVolume().then((volume: number) => {
      setVolume(volume * 100);
    });
  }, [player]);

  const handleOnChange = (volume: number) => {
    setVolume(volume);
    setShowThumb(true);
  };

  const handleOnChangeEnd = (volume: number) => {
    if (!player) return;

    player.setVolume(volume / 100);
  };

  return (
    <HStack ml={'auto'} pr={16} spacing={4}>
      <Icon as={FaVolumeDown} />
      <Slider
        colorScheme={'spotify'}
        h={6}
        w={40}
        value={volume}
        onChange={handleOnChange}
        onChangeEnd={handleOnChangeEnd}
        onMouseEnter={() => setShowThumb(true)}
        onMouseLeave={() => setShowThumb(false)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>

        <SliderThumb display={showThumb ? '' : 'none'} />
      </Slider>
    </HStack>
  );
}
