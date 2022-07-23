import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/store';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    deviceID: ''
  },
  reducers: {
    setDeviceID: (state, action) => {
      state.deviceID = action.payload;
    }
  }
});

export const playerReducer = playerSlice.reducer;
export const { setDeviceID } = playerSlice.actions;

export const selectDeviceID = (state: RootState) =>
  state.player.deviceID;
