import { configureStore } from '@reduxjs/toolkit';
import { playerReducer, userReducer } from './modules';

export const store = configureStore({
  reducer: {
    user: userReducer,
    player: playerReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
