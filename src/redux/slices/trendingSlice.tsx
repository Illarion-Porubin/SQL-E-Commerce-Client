import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "../../http/index";



export const fetchGetTrendingByLabel = createAsyncThunk<any, string, { rejectValue: string }>(
    "api/fetchGetTrendingByLabel", async (paramsProducts, { rejectWithValue }) => {
        const { data }: { data: any } = await axios.get(`/api/products/label/${paramsProducts}`);
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
                console.log(action.payload)
                state.data = action.payload.rows;
                state.isLoading = "loaded";
            })
            .addCase(fetchGetTrendingByLabel.rejected, (state) => {
                state.data = [];
                state.isLoading = "error";
            })
    },
})

export default trendingSlice.reducer;