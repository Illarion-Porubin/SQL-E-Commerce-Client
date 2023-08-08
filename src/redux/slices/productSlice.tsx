import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "../../http/index";


export const fetchGetProducts = createAsyncThunk<any, number, { rejectValue: string }>(
    "api/fetchGetProducts", async (value, { rejectWithValue }) => {
        const { data }: { data: any } = await axios.get(`/api/products/page/${value}`);
        if (!data) {
            return rejectWithValue("Server Error!");
        }
        const newData: any = data
        console.log(newData, 'fetchGetProducts') 

        return newData;
    });

export const fetchGetProductsByLabel = createAsyncThunk<any, string, { rejectValue: string }>(
    "api/fetchGetProductsByLabel", async (paramsProducts, { rejectWithValue }) => {
        const { data }: { data: any } = await axios.get(`/api/products/label/${paramsProducts}`);
        if (!data) {
            return rejectWithValue("Server Error!");
        }
        console.log(data, 'fetchGetProductsByLabel') 
        return await data;
    });

export const fetchSearchProduct = createAsyncThunk<any, string, { rejectValue: string }>(
    "api/fetchSearchProduct", async (search, { rejectWithValue }) => {
        const { data }: { data: any } = await axios.get(`/api/product/search/${search}`);
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
                state.data = action.payload.rows;
                state.isLoading = "loaded";
            })
            .addCase(fetchGetProducts.rejected, (state) => {
                state.data = [];
                state.isLoading = "error";
            })
            ///fetchGetProductsByLabel
            .addCase(fetchGetProductsByLabel.pending, (state) => {
                state.data = [];
                state.isLoading = "loading";
            })
            .addCase(fetchGetProductsByLabel.fulfilled, (state, action) => {
                state.data = action.payload.rows;
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