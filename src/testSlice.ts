import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export const testSlice = createSlice({
  name: 'test',
  initialState: {
    count: 0
  },
  reducers: {
    increaseCount: (state, action) => {
      state.count += action.payload.amount;
    },

    decreaseCount: (state) => {
      state.count -= 1;
    },

    setCount: (state, action) => {
      state.count = action.payload;
    }
  }
});

export const testReducer = testSlice.reducer;
export const { increaseCount, decreaseCount, setCount } =
  testSlice.actions;

export const selectCount = (state: RootState) => state.test.count;
