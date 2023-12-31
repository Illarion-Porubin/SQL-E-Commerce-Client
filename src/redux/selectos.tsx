import { AppState } from './store';
export const selectCartData = (state: AppState) => state.cart;
export const selectAuthData = (state: AppState) => state.auth;
export const selectProductData = (state: AppState) => state.products;
export const selectTrendingData = (state: AppState) => state.trending;
export const selectCategoriesData = (state: AppState) => state.categories;