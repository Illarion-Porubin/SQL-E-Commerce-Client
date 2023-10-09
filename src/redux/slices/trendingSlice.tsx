import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "../../http/index";
import { ProductType } from '../../types/types';

export const fetchGetTrendingByLabel = createAsyncThunk<ProductType[], string, { rejectValue: string }>(
    "api/fetchGetTrendingByLabel", async (paramsProducts, { rejectWithValue }) => {
        const { data }: { data: ProductType[] } = await axios.get(`/api/products/label/${paramsProducts}`);
        if (!data) {
            return rejectWithValue("Server Error!");
        }
        return await data;
    });

interface State {
    data: ProductType[],
    isLoading: "idle" | "loading" | "loaded" | "error";
    error: string | null,
}

const initialState:State = {
    data: [],
    isLoading: "idle",
    error: null
}

const trendingSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            ///fetchGetTrendingByLabel
            .addCase(fetchGetTrendingByLabel.pending, (state) => {
                state.data = [];
                state.isLoading = "loading";
            })
            .addCase(fetchGetTrendingByLabel.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = "loaded";
            })
            .addCase(fetchGetTrendingByLabel.rejected, (state) => {
                state.data = [];
                state.isLoading = "error";
            })
    },
})

export default trendingSlice.reducer;