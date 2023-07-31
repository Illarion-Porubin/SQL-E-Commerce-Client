import { AppState } from './store';
export const selectAuthData = (state: AppState) => state.authReducer;
export const selectProductData = (state: AppState) => state.productReducer;




