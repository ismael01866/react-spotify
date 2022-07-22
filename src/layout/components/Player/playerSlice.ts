import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    deviceID: ''
  },
  reducers: {
    setDeviceID: (state, action) => {
      state.deviceID = action.payload;
    }

    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // }
  }
});

export const playerReducer = playerSlice.reducer;

export const { setDeviceID } = playerSlice.actions;
