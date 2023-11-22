import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductCardType } from '../../types/types';
import axios from "../../http/index"; ///for work 
// import axios from "axios"; ///for tests"

export const fetchGetProducts = createAsyncThunk<ProductCardType[], null, { rejectValue: string }>(
    "api/fetchGetProducts", async (_, { rejectWithValue }) => {
        const { data }: { data: ProductCardType[] } = await axios.get(`/api/products`);
        if (!data) {
            return rejectWithValue("Server Error!");
        }
        return data;
    });

export const fetchGetProductsByLabel = createAsyncThunk<ProductCardType[], string, { rejectValue: string }>(
    "api/fetchGetProductsByLabel", async (paramsProducts, { rejectWithValue }) => {
        try {
            const { data }: { data: ProductCardType[] } = await axios.get(`/api/products/label/${paramsProducts}`);
            if (!data) {
                return rejectWithValue("Data undefined");
            }
            return data;
        } catch (error) {
            return rejectWithValue("Can't fetchGetProductsByLabel");
        }
    });


export const fetchSearchProduct = createAsyncThunk<ProductCardType[], string, { rejectValue: string }>(
    "api/fetchSearchProduct",
    async (paramsProduct, { rejectWithValue }) => {
        try {
            const { data }: { data: ProductCardType[] } = await axios.get(`/api/product/search/${paramsProduct}`);
            if (!data) {
                return rejectWithValue("Data undefined");
            }
            return data;
        } catch (error) {
            return rejectWithValue("Can't fetchSearchProduct");
        }
    });

export const fetchAddRating = createAsyncThunk<string, { ProductId: number, UserId: string | undefined, rating: number }, { rejectValue: string }>(
    "api/fetchAddRating", async (params, { rejectWithValue }) => {
        try {
            if (params) {
                await axios.post("/api/product/rating", params);
                return "Rating update"
            }
            return rejectWithValue("Data undefined");
        } catch (error) {
            return rejectWithValue("Can't fetchAddRating");
        }
    });

export interface productState {
    data: ProductCardType[],
    isLoading: "idle" | "loading" | "loaded" | "error";
    error: string | null,
}

const initialState: productState = {
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
                state.error = null;
            })
            .addCase(fetchGetProductsByLabel.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = "loaded";
                state.error = null;
            })
            .addCase(fetchGetProductsByLabel.rejected, (state) => {
                state.data = [];
                state.isLoading = "error";
                state.error = "fetchGetProductsByLabel Error!";
            })
            ///fetchSearchProduct
            .addCase(fetchSearchProduct.pending, (state) => {
                state.data = [];
                state.isLoading = "loading";
                state.error = null;
            })
            .addCase(fetchSearchProduct.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = "loaded";
                state.error = null;
            })
            .addCase(fetchSearchProduct.rejected, (state) => {
                state.data = [];
                state.isLoading = "error";
                state.error = "fetchSearchProduct Error!";
            })
        ///fetchGetProduct
        // .addCase(fetchGetProduct.pending, (state) => {
        //     state.data = [];
        //     state.isLoading = "loading";
        // })
        // .addCase(fetchGetProduct.fulfilled, (state, action) => {
        //     state.data = action.payload;
        //     state.isLoading = "loaded";
        // })
        // .addCase(fetchGetProduct.rejected, (state) => {
        //     state.data = [];
        //     state.isLoading = "error";
        // })
    },
})

export default productSlice.reducer;