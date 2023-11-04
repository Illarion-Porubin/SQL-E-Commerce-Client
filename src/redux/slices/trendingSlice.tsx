import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductCardType } from '../../types/types';
import axios from "../../http/index"; ///for work 
// import axios from "axios"; ///for tests"


export const fetchGetTrendingByLabel = createAsyncThunk<ProductCardType[], string, { rejectValue: string }>(
    "api/fetchGetTrendingByLabel", async (paramsProducts, { rejectWithValue }) => {
        try {
            const { data }: { data: ProductCardType[] } = await axios.get(`/api/products/label/${paramsProducts}`);
            if (!data) {
                return rejectWithValue("Data undefined");
            }
            return data;
        } catch (error) {
            return rejectWithValue("Can't fetchGetTrendingByLabel");
        }
    });

interface trendingState {
    data: ProductCardType[],
    isLoading: "idle" | "loading" | "loaded" | "error";
    error: string | null,
}

const initialState: trendingState = {
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
                state.error = null;
            })
            .addCase(fetchGetTrendingByLabel.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = "loaded";
                state.error = null;
            })
            .addCase(fetchGetTrendingByLabel.rejected, (state) => {
                state.data = [];
                state.isLoading = "error";
                state.error = "fetchGetTrendingByLabel Error!";
            })
    },
})

export default trendingSlice.reducer;