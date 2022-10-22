import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { RootState } from 'src/store';

export interface IPlayerSliceState {
  player: Spotify.Player | null;

  paused: boolean;

  playbackDuration: number;
  playbackPosition: number;

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

    playbackDuration: 0,
    playbackPosition: 0,

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
      state.playbackDuration = action.payload;
    },

    setPosition: (state, action) => {
      state.playbackPosition = action.payload;
    }
  }
});

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

export const selectTrack = (state: RootState) => state.player.track;
export const selectPlayer = (state: RootState) => state.player.player;
export const selectPlayerState = (state: RootState) => state.player;

export const playerReducer = playerSlice.reducer;
