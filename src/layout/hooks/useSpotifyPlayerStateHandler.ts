import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setDeviceID,
  setDuration,
  setPaused,
  setPlaybackID,
  setPosition,
  setTrack
} from 'src/modules/player/Player/PlayerSlice';
import { buildSpotifyPlayer } from 'src/utils/spotify';

export const useSpotifyPlayerStateHandler = () => {
  const dispatch = useDispatch();

  const [player, setPlayer] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== 'authenticated' || !session) return;

    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = session?.access_token as string;

      const player = buildSpotifyPlayer(token, {
        onReady: (device_id) => {
          dispatch(setDeviceID(device_id));
        },
        onStateChange: (state) => {
          dispatch(setPlaybackID(state?.playback_id));

          dispatch(setPaused(state?.paused));
          dispatch(setDuration(state?.duration));
          dispatch(setPosition(state?.position));

          dispatch(setTrack(state?.track_window?.current_track));
        }
      });

      player.connect().then((success: boolean) => {
        if (success) setPlayer(player);
      });
    };
  }, [session, status, dispatch]);

  return { player };
};
