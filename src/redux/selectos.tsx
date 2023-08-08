import { AppState } from './store';
export const selectCartData = (state: AppState) => state.cartReducer;
export const selectAuthData = (state: AppState) => state.authReducer;
export const selectProductData = (state: AppState) => state.productReducer;





