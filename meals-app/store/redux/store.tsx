import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favorites';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

/// in app import Provider from react-redux and wrap the app with it
/// <Provider store={store}> <App /> </Provider>

export default store;
