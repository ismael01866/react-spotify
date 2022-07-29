import { RootState } from 'src/store';
import { createSlice } from '@reduxjs/toolkit';

import { ITrack } from 'src/types/track';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    paused: true,

    deviceID: '',
    playbackID: '',

    track: {} as ITrack
  },
  reducers: {
    setDeviceID: (state, action) => {
      state.deviceID = action.payload;
    },

    setPlaybackID: (state, action) => {
      state.playbackID = action.payload;
    },

    setTrack: (state, action) => {
      state.track = action.payload;
    },

    setPaused: (state, action) => {
      state.paused = action.payload;
    }
  }
});

export const playerReducer = playerSlice.reducer;
export const { setDeviceID, setPlaybackID, setTrack, setPaused } =
  playerSlice.actions;

export const selectDeviceID = (state: RootState) =>
  state.player.deviceID;

export const selectPlaybackID = (state: RootState) =>
  state.player.playbackID;

export const selectTrack = (state: RootState) => state.player.track;

export const selectPaused = (state: RootState) => state.player.paused;
