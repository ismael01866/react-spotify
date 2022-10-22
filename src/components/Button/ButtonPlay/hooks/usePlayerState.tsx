import { useSelector } from 'react-redux';
import { selectPlayerState } from 'src/modules/player';

export interface UsePlayerState {
  uri?: string | undefined;
  context_uri?: string | undefined;
}

export function usePlayerState({
  uri,
  context_uri
}: UsePlayerState = {}) {
  const { player, track, paused, playbackContext, deviceID } =
    useSelector(selectPlayerState);

  let trackIsPlaying = false;

  if (track?.uri) {
    trackIsPlaying = track.uri === uri;
  }

  trackIsPlaying =
    playbackContext?.uri === context_uri || trackIsPlaying;

  return { player, deviceID, paused, trackIsPlaying };
}
