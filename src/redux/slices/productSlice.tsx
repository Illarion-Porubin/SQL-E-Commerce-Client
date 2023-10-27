import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { ProductCardType } from '../../types/types';
const HOST = 'http://localhost:5000'

// export const fetchGetProduct = createAsyncThunk<ProductCardType[], string, { rejectValue: string }>(
//     "api/fetchGetProduct", async (id, { rejectWithValue }) => {
//         const { data }: { data: ProductCardType[] } = await axios.get(`/api/product/${id}`);
//         if (!data) {
//             return rejectWithValue("Server Error!");
//         }
//         return data;
//     });

// export const fetchGetProductsByLabel = createAsyncThunk<ProductCardType[], string, { rejectValue: string }>(
//     "api/fetchGetProductsByLabel", async (paramsProducts, { rejectWithValue }) => {
//         try {
//             const { data }: { data: ProductCardType[] } = await axios.get(`/api/products/label/${paramsProducts}`);
//             if (!data) {
//                 return rejectWithValue("Server Error!");
//             }
//             return data;
//         } catch (error: any) {
//             return rejectWithValue(error.response);
//         }
//     });

export const fetchGetProductsByLabel = createAsyncThunk<ProductCardType[], string, { rejectValue: string }>(
    "api/fetchGetProductsByLabel", async (paramsProducts, { rejectWithValue }) => {
        try {
            const response = await fetch(`${HOST}/api/products/label/${paramsProducts}`)
            if (!response.ok) {
                throw new Error("Can't fetch")
            }
            const data = await response.json()
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
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

export const fetchAddRating = createAsyncThunk<ProductCardType[], { ProductId: number, UserId: string | undefined, rating: number }, { rejectValue: string }>(
    "api/fetchAddRating", async (params, { rejectWithValue }) => {
        const { data }: { data: ProductCardType[] } = await axios.post("/api/product/rating", params);
        if (!data) {
            return rejectWithValue("Server Error!");
        }
        return data;
    });

export interface productReducer {
    data: ProductCardType[],
    isLoading: "idle" | "loading" | "loaded" | "error";
    error: string | null,
}

const initialState: productReducer = {
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