import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "../../http/index";


export const fetchGetProducts = createAsyncThunk(
    "api/fetchGetProducts", async (_, { rejectWithValue }) => {
        const { data } = await axios.get("/api/product");
        if (!data) {
            return rejectWithValue("Server Error!");
        }
        return await data;
    });

export const fetchGetProduct = createAsyncThunk(
    "api/fetchGetProduct", async (id, { rejectWithValue }) => {
        const { data } = await axios.get(`/api/product/${id}`);
        if (!data) {
            return rejectWithValue("Server Error!");
        }
        console.log(data, 'fetchGetProduct')
        return await data;
    });

const initialState = {
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
            ///fetchGetProducts
            .addCase(fetchGetProducts.pending, (state) => {
                state.data = [];
                state.isLoading = "loading";
            })
            .addCase(fetchGetProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = "loaded";
            })
            .addCase(fetchGetProducts.rejected, (state) => {
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