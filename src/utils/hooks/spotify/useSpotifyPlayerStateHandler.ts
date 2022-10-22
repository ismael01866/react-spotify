import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setDeviceID,
  setDuration,
  setPaused,
  setPlaybackContext,
  setPlaybackID,
  setPlayer,
  setPosition,
  setTrack
} from 'src/modules/player/Player/PlayerSlice';
import { buildSpotifyPlayer } from 'src/utils/spotify';

export const useSpotifyPlayerStateHandler = () => {
  const { data } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) return;

    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = data.access_token as string;

      const player = buildSpotifyPlayer(token, {
        onReady: (device_id) => {
          dispatch(setDeviceID(device_id));
        },
        onStateChange: (state) => {
          dispatch(setPlaybackID(state?.playback_id));
          dispatch(setPlaybackContext(state?.context));

          dispatch(setPaused(state?.paused));
          dispatch(setDuration(state?.duration));
          dispatch(setPosition(state?.position));

          dispatch(setTrack(state?.track_window?.current_track));
        }
      });

      player.connect().then((success: boolean) => {
        if (success) dispatch(setPlayer(player));
      });
    };
  }, [data, dispatch]);
};
