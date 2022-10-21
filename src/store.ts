import {
  configureStore,
  createSerializableStateInvariantMiddleware
} from '@reduxjs/toolkit';
import { playerReducer } from './modules/player/Player/PlayerSlice';

const serializableMiddleware =
  createSerializableStateInvariantMiddleware({
    ignoredPaths: ['player.player'],
    ignoredActions: ['player/setPlayer']
  });

export const store = configureStore({
  reducer: {
    player: playerReducer
  },
  middleware: [serializableMiddleware]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
