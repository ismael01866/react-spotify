import { configureStore } from '@reduxjs/toolkit';
import { playerReducer } from './features/player';
import { userReducer } from './features/user';

export const store = configureStore({
  reducer: {
    user: userReducer,
    player: playerReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
