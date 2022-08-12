import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/store';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    display_name: '',
    country: '',
    images: []
  },
  reducers: {
    setUser: (state, action) => {
      const { email, display_name, country, images } = action.payload;

      state.email = email;
      state.images = images;
      state.country = country;
      state.display_name = display_name;
    }
  }
});

export const userReducer = userSlice.reducer;
export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
