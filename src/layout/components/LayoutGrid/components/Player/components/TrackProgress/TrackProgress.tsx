import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text
} from '@chakra-ui/react';
import moment from 'moment';

import { selectPlayerState } from 'modules/player/Player/PlayerSlice';

export function TrackProgress() {
  let timer = useRef({});

  const { player, paused, playbackID, playbackPosition, playbackDuration } =
    useSelector(selectPlayerState);

  const [progress, setProgress] = useState(0);
  const [showThumb, setShowThumb] = useState(false);

  useEffect(() => {
    setProgress(0);
  }, [playbackID]);

  useEffect(() => {
    if (timer.current) {
      clearInterval(timer.current as string);
    }

    if (paused) {
      return setProgress(playbackPosition);
    }

    let counter = playbackPosition / 1000;
    timer.current = setInterval(() => {
      setProgress(counter++ * 1000);
    }, 1000);
  }, [paused, playbackPosition]);

  useEffect(() => {
    return () => {
      clearInterval(timer.current as string);
    };
  }, []);

  const handleOnChange = (value: number) => {
    setProgress((value * playbackDuration) / 100);
    setShowThumb(true);
  };

  const handleOnChangeEnd = (value: number) => {
    if (!player) return;

    player.seek((value * playbackDuration) / 100);
  };

  return (
    <HStack gap={4} w={'full'}>
      <Text color={'text.base'} fontSize={'xs'}>
        {moment(progress).format('mm:ss')}
      </Text>

      <Slider
        colorScheme={'spotify'}
        h={8}
        w={'full'}
        value={progress / (playbackDuration / 100)}
        onChange={handleOnChange}
        onChangeEnd={handleOnChangeEnd}
        onMouseEnter={() => setShowThumb(true)}
        onMouseLeave={() => setShowThumb(false)}
      >
        <SliderTrack>
          <SliderFilledTrack bgColor={'spotify.500'} />
        </SliderTrack>

        <SliderThumb display={showThumb ? '' : 'none'} />
      </Slider>

      <Text color={'text.base'} fontSize={'xs'}>
        {moment(playbackDuration).format('mm:ss')}
      </Text>
    </HStack>
  );
}
