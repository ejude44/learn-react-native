import { createSlice } from '@reduxjs/toolkit';

export interface FavoritesState {
  ids: string[];
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    ids: [],
  } as FavoritesState,
  reducers: {
    addFavorite: (state, action) => {
      state.ids.push(action.payload.id);
    },
    removeFavorite: (state, action) => {
      state.ids = state.ids.filter(
        (favorite: any) => favorite.id !== action.payload
      );
    },
  },
});

export const addFavorite = favoritesSlice.actions.addFavorite;
export const removeFavorite = favoritesSlice.actions.removeFavorite;
export default favoritesSlice.reducer;
