import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';


const rootReducer = combineReducers({
  authReducer,
  productReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false
  }),
})

export type AppState = ReturnType<typeof store.getState>
export type AppStore = typeof store;
export type AppDispath = AppStore['dispatch']