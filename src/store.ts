import { configureStore } from '@reduxjs/toolkit';
import { playerReducer, userReducer } from './modules';
import { testReducer } from './testSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    player: playerReducer,
    test: testReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
