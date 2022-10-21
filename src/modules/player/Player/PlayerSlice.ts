import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { RootState } from 'src/store';

export interface IPlayerSliceState {
  player: Spotify.Player | null;

  paused: boolean;
  duration: number;
  position: number;

  deviceID: string;
  playbackID: string;
  playbackContext: Spotify.PlaybackContext;

  track: Spotify.Track | null;
}

export const playerSlice = createSlice<
  IPlayerSliceState,
  SliceCaseReducers<any>
>({
  name: 'player',
  initialState: {
    player: null,
    paused: true,
    duration: 0,
    position: 0,

    deviceID: '',
    playbackID: '',
    playbackContext: {
      uri: '',
      metadata: null
    },

    track: null
  },
  reducers: {
    setPlayer: (state, action) => {
      state.player = action.payload;
    },

    setDeviceID: (state, action) => {
      state.deviceID = action.payload;
    },

    setPlaybackID: (state, action) => {
      state.playbackID = action.payload;
    },

    setPlaybackContext: (state, action) => {
      state.playbackContext = action.payload;
    },

    setTrack: (state, action) => {
      state.track = action.payload;
    },

    setPaused: (state, action) => {
      state.paused = action.payload;
    },

    setDuration: (state, action) => {
      state.duration = action.payload;
    },

    setPosition: (state, action) => {
      state.position = action.payload;
    }
  }
});

export const playerReducer = playerSlice.reducer;
export const {
  setPlayer,
  setDeviceID,
  setPlaybackID,
  setPlaybackContext,
  setTrack,
  setPaused,
  setDuration,
  setPosition
} = playerSlice.actions;

export const selectPlayer = (state: RootState) => state.player.player;

export const selectDeviceID = (state: RootState) =>
  state.player.deviceID;

export const selectPlaybackID = (state: RootState) =>
  state.player.playbackID;

export const selectPlaybackContext = (state: RootState) =>
  state.player.playbackContext;

export const selectTrack = (state: RootState) => state.player.track;

export const selectPaused = (state: RootState) => state.player.paused;
export const selectDuration = (state: RootState) =>
  state.player.duration;

export const selectPosition = (state: RootState) =>
  state.player.position;
