import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "../../http/index";
import { ProductCardType } from '../../types/types';


export const fetchGetProduct = createAsyncThunk<ProductCardType[], string, { rejectValue: string }>(
    "api/fetchGetProduct", async (id, { rejectWithValue }) => {
        const { data }: { data: ProductCardType[] } = await axios.get(`/api/product/${id}`);
        if (!data) {
            return rejectWithValue("Server Error!");
        }
        return data;
    });

export const fetchGetProductsByLabel = createAsyncThunk<ProductCardType[], string, { rejectValue: string }>(
    "api/fetchGetProductsByLabel", async (paramsProducts, { rejectWithValue }) => {
        const { data }: { data: ProductCardType[] } = await axios.get(`/api/products/label/${paramsProducts}`);
        if (!data) {
            return rejectWithValue("Server Error!");
        }
        return data;
    });

export const fetchSearchProduct = createAsyncThunk<ProductCardType[], string, { rejectValue: string }>(
    "api/fetchSearchProduct",
    async (paramsProduct, { rejectWithValue }) => {
        const { data }: { data: ProductCardType[] } = await axios.get(`/api/product/search/${paramsProduct}`);
        if (!data) {
            return rejectWithValue("Server Error!");
        }
        return data;
    });

export const fetchAddRating = createAsyncThunk<ProductCardType[], {ProductId: number, UserId: string | undefined, rating: number}, { rejectValue: string }>(
    "api/fetchAddRating", async (params, { rejectWithValue }) => {
        const { data }: { data: ProductCardType[] } = await axios.post("/api/product/rating", params);
        if (!data) {
            return rejectWithValue("Server Error!");
        }
        return data;
    });

interface State {
    data: ProductCardType[],
    isLoading: "idle" | "loading" | "loaded" | "error";
    error: string | null,
}

const initialState: State = {
    data: [],
    isLoading: "idle",
    error: null
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            ///fetchGetProductsByLabel
            .addCase(fetchGetProductsByLabel.pending, (state) => {
                state.data = [];
                state.isLoading = "loading";
            })
            .addCase(fetchGetProductsByLabel.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = "loaded";
            })
            .addCase(fetchGetProductsByLabel.rejected, (state) => {
                state.data = [];
                state.isLoading = "error";
            })
            ///fetchSearchProduct
            .addCase(fetchSearchProduct.pending, (state) => {
                state.data = [];
                state.isLoading = "loading";
            })
            .addCase(fetchSearchProduct.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = "loaded";
            })
            .addCase(fetchSearchProduct.rejected, (state) => {
                state.data = [];
                state.isLoading = "error";
            })
            ///fetchGetProduct
            .addCase(fetchGetProduct.pending, (state) => {
                state.data = [];
                state.isLoading = "loading";
            })
            .addCase(fetchGetProduct.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = "loaded";
            })
            .addCase(fetchGetProduct.rejected, (state) => {
                state.data = [];
                state.isLoading = "error";
            })
    },
})

export default productSlice.reducer;